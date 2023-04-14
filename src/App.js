import { useEffect, useState } from "react";
import "./App.css";
import { getAllpokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true); //loadingの初期値をtrueにする
  const [pokemonData, setpokemonData] = useState([]); //loadingの初期値をtrueにする
  const [nextURL, setNextURL] = useState();//次のページのURLを取得
  const [previousURL, setPreviousURL] = useState();

  useEffect(() => {
    const fetchPokemonData = async () => {
      //ポケモンの全データを取得
      let res = await getAllpokemon(initialURL); //asyncとpromiseはセットとして考える
      //ポケモンのデータの詳細を取得
      //元となるURLを取得したらそこの入っているオブジェクトの中身を取り出す
      loadPokemon(res.results); //このリザルトの中に２０種類のオブジェクト配列が格納されている
      setNextURL(res.next);
      setPreviousURL(res.previous);
      setLoading(false); //読み込み終わったらloading変数をfalseに変更
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    //20ものオブジェクト配列が格納されている
    //このdataにはres.resaltsの中にあるnameとurlが入っている
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url); //mapで順番に個別のURLを取得する。
        //getAllpokemonは20個データ取得しているURLを取得
        //getPokemonは1個ずつデータ取得しURLを取得
        return pokemonRecord; //1個ずつ取得したデータはreturnで_pokemonDataに出力（データを返す）
      })
    );
    setpokemonData(_pokemonData);
    //この関数を使うことでこのloadPokemonの中のデータを
    //この関数以外でもデータを読み込みをさせている
    //今回であればpokemonDataにデータを引き渡している
  };

  // console.log(pokemonData);
  const handlePrevPage = async () => {
    if (!previousURL) return;

    setLoading(true); //前へを押したときに改めてロード中の画面を出すため、一度ロード中にする
    let data = await getAllpokemon(previousURL); //asyncとpromiseはセットとして考える
    loadPokemon(data.results);
    setPreviousURL(data.previous);
    setLoading(false);
  };

  const handleNextPage = async () => {
    setLoading(true); //次へを押したときに改めてロード中の画面を出すため、一度ロード中にする
    let data = await getAllpokemon(nextURL); //asyncとpromiseはセットとして考える
    loadPokemon(data.results);
    setNextURL(data.next);
    setPreviousURL(data.previous);//一番初めはnullになっているが、次のページに移った際このタイミングで取得する
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <>
            <h1>ロード中・・・</h1>
          </>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn"></div>
            <button className="button" onClick={handlePrevPage}>前へ</button>
            <button className="button" onClick={handleNextPage}>次へ</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
