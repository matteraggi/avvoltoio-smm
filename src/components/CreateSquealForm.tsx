const CreateSquealForm = () => {
  return (
    <form>
      <div>
        <span>destinations</span>
        <div>
          <textarea></textarea>
        </div>
      </div>
      <div>
        <span>body</span>
        <div>
          <textarea></textarea>
          <label>body</label>
        </div>
      </div>
      <div>
        <div>
          <button>Invia</button>
          <p>hai finito i caratteri del get-type</p> {/*{{ getType() }}*/}
          <button>Compra</button>
        </div>
        <p>Remaining-Chars caratteri rimanenti</p>{" "}
        {/*{{ getRemainingChars() }}*/}
      </div>
      <div>
        <div>
          <label>Immagine</label>
          <div>
            <img alt="Immagine" />
            <div>
              <span></span>{" "}
              {/*{{ dto?.squeal?.img_content_type }}, {{ byteSize(dto?.squeal?.img) }}*/}
              <button title="clear" type="button">
                {/*(click)="clearInputImage()"*/}
                {/*fa-icon time*/}
              </button>
            </div>
            <div>
              <div>
                <button type="button">Ruotare</button>{" "}
                {/*(click)="rotateImage()"*/}
              </div>
              <div>
                <button type="button">
                  {/*onClick={document.getElementById('file_select').click()}*/}
                  Seleziona
                </button>
              </div>
              <div>
                <button type="button">
                  {/*onClick={document.getElementById('file_camera').click()}*/}
                  Scatta foto
                </button>
              </div>
            </div>
            <input type="file" id="file_select" accept="image/*" />{" "}
            {/*(change)="setFileData($event)"*/}
            <input type="file" id="file_camera" accept="image/*" />{" "}
            {/*capture="camera", (change)="setFileData($event)"*/}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateSquealForm;
