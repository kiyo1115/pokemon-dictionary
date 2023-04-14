export const getAllpokemon = (url) => {
  return new Promise((resolve, reject) => {
    //リターン内の処理を待ってもらうための処理
    fetch(url)//引数に指定されているURLを取得
      .then((res) => res.json()) //引数のURLをjson形式で受け取る
      .then((data) => resolve(data)); //jsonで受け取ったものをデータとして受け取り、結果をresolveで表示
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json()) 
    .then((data) => resolve(data)); 
  });
};
