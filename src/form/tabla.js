import { LitElement, html, css } from 'lit';

export class DynamicTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: Arial, sans-serif;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 1rem;
    }
    .input-group input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .input-group button {
      padding: 8px 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .input-group button:hover {
      background-color: #0056b3;
    }
    .delete-btn {
      padding: 4px 8px;
      background-color: #dc3545;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .delete-btn:hover {
      background-color: #c82333;
    }
  `;

  static properties = {
    rows: { type: Array },
    newRow: { type: Object },
  };

  constructor() {
    super();
    this.rows = [];
    this.newRow = { name: '', age: '' };
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.newRow = { ...this.newRow, [name]: value };
  }

  addRow() {
    if (this.newRow.name && this.newRow.age) {
      this.rows = [...this.rows, { ...this.newRow }];
      this.newRow = { name: '', age: '' };
    } else {
      alert('Please enter both name and age.');
    }
  }

  deleteRow(index) {
    this.rows = this.rows.filter((_, i) => i !== index);
  }

  render() {
    return html`
      <div class="input-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          .value="${this.newRow.name}"
          @input="${this.handleInputChange}"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          .value="${this.newRow.age}"
          @input="${this.handleInputChange}"
        />
        <button @click="${this.addRow}">Add Row</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${this.rows.map(
            (row, index) => html`
              <tr>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td><button class="delete-btn" @click="${() => this.deleteRow(index)}">Delete</button></td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

customElements.define('dynamic-table', DynamicTable);
