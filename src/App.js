import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import MemoryCard from "./components/MemoryCard";

//kartların tanımlanması ve matched: false => seçilen kartın durumu
const cardList = [
  { path: "/img/1.png", matched: false },
  { path: "/img/2.png", matched: false },
  { path: "/img/3.png", matched: false },
  { path: "/img/4.png", matched: false },
  { path: "/img/5.png", matched: false },
  { path: "/img/6.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null); //1.seçim
  const [selectedTwo, setSelectedTwo] = useState(null); //2.seçim
  const [disabled, setDisabled] = useState(false); //2 seçim yapıldıktan sonra durumu
  const [score, setScore] = useState(0); //kaç denemede aynı kartı bulduk

  //kartların dağıtıldığı an
  const prepareCard = () => {
    const sortedCards = [...cardList, ...cardList] //her karttan 2 adet
      .sort(() => 0.5 - Math.random()) //random'un otomatik olarak 0-1 arası değer üretmesi
      .map((card) => ({ ...card, id: Math.random() })); //sayfayı yenileyince kartların random sıralanması

    setCards(sortedCards);
    setSelectedOne(null);
    setSelectedTwo(null);
    setScore(0);
  };
  //resim seçildiğide
  const handleSelected = (card) => {
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  };

  //uygulama yenilenince
  useEffect(() => {
    prepareCard();
  }, []);

  //2 seçim yapıldıktan sonra 3.seçimi yapmasın
  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisabled(true);
      //2 seçimde yapılmış ise ve seçimler aynı ise kart durumlarını güncelle=>matched
      if (selectedOne.path === selectedTwo.path) {
        setCards((previosCards) => {
          return previosCards.map((card) => {
            if (card.path === selectedOne.path) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetState();
        //2 seçimde yapılmış ise ve seçimler aynı degil ise bir sonraki tura geç
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisabled(false);
    setScore((previousScore) => previousScore + 1);
  };

  return (
    <div className="container">
      <h2>Musa ŞEKEROĞLU</h2>
      <h3>Hafıza Oyunu</h3>
      <p className="score">Skor : {score}</p>
      {/* butona tıklayınca kartların random sıralanması */}
      <button className="btn" onClick={prepareCard}>
        Oyunu Başlat
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <MemoryCard
            card={card}
            key={card.id}
            handleSelected={handleSelected} //resim seçildiğide
            disabled={disabled} //resim seçildiğide 3.kart seçilmesin
            //2 kart seçilebilsin ve aynı ise açık kalsın,aynı değilse 1 saniye sonra kapatılsın
            rotated={
              card === selectedOne || card === selectedTwo || card.matched
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;
