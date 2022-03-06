

export default function Modal({ setShowModal, show, children }) {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={()=>{setShowModal(false)}}>
          Close
        </button>
      </section>
    </div>
  );
}
