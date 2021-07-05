import logo from "./logo.svg";
import "./App.css";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";

function App() {
  return (
    <div className="mainContainer">
      <section className="addITem">
        <AddItemForm />
      </section>

      <section className="itemListSection">
        <ItemList />
      </section>
    </div>
  );
}

export default App;
