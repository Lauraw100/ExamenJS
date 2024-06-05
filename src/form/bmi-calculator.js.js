import { LitElement, html, css } from "lit";

export class BmiCalculator extends LitElement {
  static styles = css`
    :host {
      font-family: Arial, sans-serif;
      display: block;
      text-align: center;
      width: 90vw;
      max-width: 500px;
      margin: 0 auto;
      padding: 1rem;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      border: 1px solid #ccc;
      border-radius: 4px;
      width: calc(100% - 20px);
      padding: 8px;
    }
    .input-group {
      margin-bottom: 15px;
    }
    button {
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
    }
    button:hover {
      background-color: #0056b3;
    }
    .result {
      margin-top: 20px;
    }
    #bmiImage {
      margin-top: 15px;
      max-width: 100px;
    }
  `;

  static properties = {
    weight: { type: Number },
    height: { type: Number },
    bmi: { type: Number },
    bmiCategory: { type: String },
    imgSrc: { type: String },
  };

  constructor() {
    super();
    this.weight = 0;
    this.height = 0;
    this.bmi = 0;
    this.bmiCategory = "";
    this.imgSrc = "";
  }

  handleInputChange(event) {
    const { id, value } = event.target;
    this[id] = parseFloat(value);
  }

  setBmiCategory() {
    if (this.bmi < 18.5) {
      this.bmiCategory = "Bajo peso";
      this.imgSrc = "public/img/bp.png";
    } else if (this.bmi >= 18.5 && this.bmi < 24.9) {
      this.bmiCategory = "Peso normal";
      this.imgSrc = "public/img/normal.png";
    } else if (this.bmi >= 25 && this.bmi < 29.9) {
      this.bmiCategory = "Sobrepeso";
      this.imgSrc = "public/img/sp.png";
    } else {
      this.bmiCategory = "Obesidad";
      this.imgSrc = "public/img/ob.png";
    }
  }
  calculateBmi() {
    if (this.weight > 0 && this.height > 0) {
      this.bmi = this.weight / (this.height * this.height);
      this.setBmiCategory();
    } else {
      this.bmi = 0;
      this.bmiCategory =
        "*Por favor, ingresa valores válidos para el peso y la altura.*";
      this.imgSrc = "";
    }
  }
  render() {
    return html`
      <div>
        <h1>Calculadora de IMC</h1>
        <div class="input-group">
          <label for="weight">Peso (kg):</label>
          <input
            type="number"
            id="weight"
            @input="${this.handleInputChange}"
            required
          />
        </div>
        <div class="input-group">
          <label for="height">Altura (m):</label>
          <input
            type="number"
            id="height"
            @input="${this.handleInputChange}"
            required
          />
        </div>
        <button @click="${this.calculateBmi}">Calcular</button>
        <div class="result">
          <p>
            ${this.bmi
              ? `IMC: ${this.bmi.toFixed(2)} (${this.bmiCategory})`
              : this.bmiCategory}
          </p>
          ${this.imgSrc
            ? html`<img id="bmiImage" src="${this.imgSrc}" alt="IMC Image" />`
            : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("bmi-calculator", BmiCalculator);
