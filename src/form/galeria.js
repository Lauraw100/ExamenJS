import { LitElement, html, css } from 'lit';

export class ImageGallery extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    .gallery {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .thumbnail {
      cursor: pointer;
      width: 100px;
      height: 100px;
      object-fit: cover;
      border: 2px solid #ccc;
      border-radius: 5px;
    }
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      justify-content: center;
      align-items: center;
    }
    .modal.show {
      display: flex;
    }
    .modal-content {
      position: relative;
      background: #fff;
      padding: 1rem;
      border-radius: 5px;
      max-width: 90%;
      max-height: 90%;
    }
    .modal img {
      max-width: 100%;
      max-height: 80vh;
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      font-size: 24px;
      color: #333;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 50%;
      width: 100%;
    }
    .nav button {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
    }
  `;

  static properties = {
    images: { type: Array },
    selectedImageIndex: { type: Number },
    showModal: { type: Boolean },
  };

  constructor() {
    super();
    this.images = [];
    this.selectedImageIndex = 0;
    this.showModal = false;
  }

  openModal(index) {
    this.selectedImageIndex = index;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  nextImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex + 1) % this.images.length;
  }

  prevImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }

  render() {
    return html`
      <div class="gallery">
        ${this.images.map(
          (image, index) => html`
            <img
              src="${image}"
              class="thumbnail"
              @click="${() => this.openModal(index)}"
              alt="Image ${index + 1}"
            />
          `
        )}
      </div>
      ${this.showModal
        ? html`
            <div class="modal show">
              <div class="modal-content">
                <span class="close" @click="${this.closeModal}">&times;</span>
                <img src="${this.images[this.selectedImageIndex]}" alt="Image" />
                <div class="nav">
                  <button @click="${this.prevImage}">&lt;</button>
                  <button @click="${this.nextImage}">&gt;</button>
                </div>
              </div>
            </div>
          `
        : ''}
    `;
  }
}

customElements.define('image-gallery', ImageGallery);

