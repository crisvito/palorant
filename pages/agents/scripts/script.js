import { agentAbilities } from "./abilities.js";
const abilitiesVideo = document.querySelector(".abilityVideo");
const abilities = document.querySelectorAll(".abilities-img .img-detail");
const agent = document.querySelector(".agent-header h2");
const abilitiesTitle = document.querySelector(".abilities-desc h3");
const abilitiesDesc = document.querySelector(".abilities-desc p");

const getAgent = agentAbilities.find(
  (getAgent) => getAgent.name.toLowerCase() === agent.textContent.toLowerCase()
);

let currentActive = document.querySelector(".abilities-img .active");

abilities.forEach((ability) => {
  ability.addEventListener("click", () => {
    if (currentActive) currentActive.classList.remove("active");
    ability.classList.add("active");
    currentActive = ability;

    abilitiesVideo.src = `../../../../assets/videos/${agent.textContent.toLowerCase()}/${
      ability.id
    }.mp4`;

    ability.classList.add("active");

    const result = getAgent.abilities.find((abil) => abil.id === ability.id);
    abilitiesTitle.innerHTML = result.title;
    abilitiesDesc.innerHTML = result.desc;
  });
});
