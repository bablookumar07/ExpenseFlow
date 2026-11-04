
import {
  filterTransactionsByDateRange,
  getExportRangeLabel,
} from "./exportUtils";

const escapeHTML = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

const formatAmount = (amount, currency) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

export const printTransactionsReport = ({
  transactions,
  options,
  currency,
  convertAmount,
  userName,
  printWindow,
}) => {
  const filtered = filterTransactionsByDateRange(
    transactions,
    options
  );

  if (!filtered.length) {
    throw new Error(
      "No transactions found for the selected date range."
    );
  }

  if (!printWindow || printWindow.closed) {
    throw new Error(
      "Print window could not be opened. Please allow pop-ups and try again."
    );
  }

  const income = filtered
    .filter((item) => item.type === "income")
    .reduce(
      (total, item) =>
        total + convertAmount(Number(item.amount) || 0),
      0
    );

  const expenses = filtered
    .filter((item) => item.type === "expense")
    .reduce(
      (total, item) =>
        total + convertAmount(Number(item.amount) || 0),
      0
    );

  const balance = income - expenses;

  const rows = [...filtered]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .map(
      (item) => `
        <tr>
          <td>${escapeHTML(item.title || "Untitled")}</td>
          <td class="amount">${escapeHTML(
            formatAmount(
              convertAmount(Number(item.amount) || 0),
              currency
            )
          )}</td>
          <td>
            <span class="type ${
              item.type === "income" ? "income" : "expense"
            }">
              ${item.type === "income" ? "Income" : "Expense"}
            </span>
          </td>
          <td>${escapeHTML(item.category || "Other")}</td>
          <td>${escapeHTML(
            item.date
              ? new Date(item.date).toLocaleDateString("en-IN")
              : ""
          )}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>ExpenseFlow Financial Report</title>

      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 32px;
          color: #1e293b;
          background: #ffffff;
          font-family: Arial, Helvetica, sans-serif;
        }

        .header {
          padding: 24px;
          color: white;
          background: #5b3fbe;
          border-radius: 12px;
        }

        .header h1 {
          margin: 0 0 6px;
          font-size: 28px;
        }

        .header p {
          margin: 0;
          opacity: 0.9;
        }

        .details {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin: 28px 0;
        }

        .detail-label {
          color: #64748b;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .detail-value {
          font-size: 15px;
          font-weight: 700;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 30px;
        }

        .summary-card {
          padding: 18px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .summary-card h3 {
          margin: 0 0 12px;
          color: #64748b;
          font-size: 11px;
          letter-spacing: 0.5px;
        }

        .summary-card p {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
        }

        .income-value {
          color: #059669;
        }

        .expense-value {
          color: #dc2626;
        }

        .balance-value {
          color: #5b3fbe;
        }

        h2 {
          margin-bottom: 14px;
          font-size: 18px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        th {
          padding: 12px 10px;
          text-align: left;
          color: white;
          background: #5b3fbe;
        }

        td {
          padding: 11px 10px;
          border-bottom: 1px solid #e2e8f0;
        }

        tbody tr:nth-child(even) {
          background: #f8fafc;
        }

        .amount {
          text-align: right;
          white-space: nowrap;
        }

        .type {
          font-weight: 700;
        }

        .income {
          color: #059669;
        }

        .expense {
          color: #dc2626;
        }

        .footer {
          margin-top: 30px;
          padding-top: 12px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 11px;
          text-align: center;
        }

        @page {
          size: landscape;
          margin: 12mm;
        }

        @media print {
          body {
            padding: 0;
          }

          .header,
          th {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .summary-card,
          tbody tr:nth-child(even) {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          thead {
            display: table-header-group;
          }

          tr {
            break-inside: avoid;
          }
        }

        @media screen and (max-width: 650px) {
          body {
            padding: 16px;
          }

          .summary {
            grid-template-columns: 1fr;
          }

          .details {
            flex-direction: column;
          }
        }
      </style>
    </head>

    <body>
      <header class="header">
        <h1>ExpenseFlow</h1>
        <p>Personal Financial Report</p>
      </header>

      <section class="details">
        <div>
          <div class="detail-label">ACCOUNT HOLDER</div>
          <div class="detail-value">${escapeHTML(
            userName || "ExpenseFlow User"
          )}</div>
        </div>

        <div>
          <div class="detail-label">REPORT PERIOD</div>
          <div class="detail-value">${escapeHTML(
            getExportRangeLabel(options)
          )}</div>
        </div>

        <div>
          <div class="detail-label">REPORT DATE</div>
          <div class="detail-value">${escapeHTML(
            new Date().toLocaleDateString("en-IN")
          )}</div>
        </div>
      </section>

      <section class="summary">
        <div class="summary-card">
          <h3>TOTAL INCOME</h3>
          <p class="income-value">${escapeHTML(
            formatAmount(income, currency)
          )}</p>
        </div>

        <div class="summary-card">
          <h3>TOTAL EXPENSES</h3>
          <p class="expense-value">${escapeHTML(
            formatAmount(expenses, currency)
          )}</p>
        </div>

        <div class="summary-card">
          <h3>NET BALANCE</h3>
          <p class="balance-value">${escapeHTML(
            formatAmount(balance, currency)
          )}</p>
        </div>
      </section>

      <h2>Transaction Details (${filtered.length})</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th style="text-align:right">Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>${rows}</tbody>
      </table>

      <footer class="footer">
        Generated by ExpenseFlow
      </footer>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.focus();

  // Allow the print document to render before opening the dialog.
  printWindow.setTimeout(() => {
    if (!printWindow.closed) {
      printWindow.print();
    }
  }, 500);

  return filtered.length;
};
