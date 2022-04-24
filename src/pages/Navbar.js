import "bootstrap/dist/css/bootstrap.min.css";
export default function Navbar() {
  function DarkModeHandler() {
    const body = document.querySelector("body");
    const searhInput = document.querySelector(".search-input");
    const card = document.querySelectorAll(".wrapper-card");
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      searhInput.classList.add("dark-mode");
      card.forEach((card) => {
        card.classList.add("dark-mode");
      });
    } else {
      searhInput.classList.remove("dark-mode");
      card.forEach((card) => {
        card.classList.remove("dark-mode");
      });
    }
  }
  return (
    <>
      <nav className="navbar pt-3 pb-3 shadow">
        <div className="container p-2">
          <div className="judul">
            <span className="fw-bold title fs-4">Whare In The World?</span>
          </div>

          <div className="btn-thame">
            <span className="btn-icon"></span>
            <span style={{cursor: 'pointer'}} onClick={DarkModeHandler}>
              Dark Mode
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
