const getRandomInt = (min,max) =>{
  return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const ramdom = getRandomInt(1,152);
  fetchData(ramdom);
});

const fetchData = async(id)=>{
  try{
    console.log(id);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(data);

    const pokemon ={
      imgJuego: data.sprites.front_default,
      img: data.sprites.other.dream_world.front_default,
      nombre: data.name,
      experiencia: data.base_experience,
      hp: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      especial: data.stats[3].base_stat,
    };

    pintarCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const pintarCard = (pokemon) =>{
  const flex = document.querySelector('.flex');
  const template = document.getElementById("card").content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone.querySelector('.card__body-img').setAttribute('src',pokemon.img);
  clone.querySelector('.card__body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
  clone.querySelector('.card__body-text').textContent = pokemon.experiencia + " Exp";
  clone.querySelectorAll('.card__footer-social h3')[0].textContent = pokemon.ataque + "K";
  clone.querySelectorAll('.card__footer-social h3')[1].textContent = pokemon.especial + "K";
  clone.querySelectorAll('.card__footer-social h3')[2].textContent = pokemon.defensa + "K";

  fragment.appendChild(clone);
  flex.appendChild(fragment);
};


