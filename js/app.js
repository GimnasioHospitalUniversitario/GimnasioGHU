/* =========================================================
   GHU — JAVASCRIPT BÁSICO
   ========================================================= */
const prices = {
  medica: {
    name: "Área Médica",
    annual: "$300",
    annualDescription: "Anualidad para Área Médica.",
    functional: "$350",
    functionalDescription: "Costo por clase: $100.",
    weights: {
        restringido: { price: "$350",
                       description: "Horario restringido: 6:00 a.m. a 3:00 p.m. - día $100" },
        abierto: { price: "$400",
                   description: "Horario abierto: 6:00 a.m. a 9:00 p.m. - día $100" }
    }
  },

  estudiante: {
    name: "Estudiante UANL",
    annual: "$300",
    annualDescription:
      "Anualidad para estudiantes UANL.",
    functional: "$370",
    functionalDescription: "Costo por clase: $100.",
    weights: {
      restringido: {
        price: "$450",
        description:
          "Costo por día $100"
      }
    }
  },

  trabajador: {
    name: "Trabajador UANL",
    annual: "$300",
    annualDescription:
      "Anualidad para trabajadores UANL.",
    functional: "$370",
    functionalDescription: "Costo por clase: $100.",
    weights: {
      restringido: {
        price: "$450",
        description:
          "Costo por día $100"
      }
    }
  },

  externo: {
    name: "Público general",
    annual: "$500",
    annualDescription:
      "Anualidad para público general.",
    functional: "$470",
    functionalDescription: "Costo por clase: $100.",
    weights: {
      restringido: {
        price: "$550",
        description:
          "Costo por día $100"
      }
    }
  }
};


const profileButtons =
    document.querySelectorAll(".profile-btn");

const selectedProfile =
    document.getElementById("selectedProfile");

const priceAnnual =
    document.getElementById("priceAnnual");

const annualDescription =
    document.getElementById("annualDescription");

const priceFunctional =
    document.getElementById("priceFunctional");

const functionalDescription =
    document.getElementById("functionalDescription");

const priceWeights =
    document.getElementById("priceWeights");

const weightsDescription =
    document.getElementById("weightsDescription");

const weightsScheduleSelector =
    document.getElementById("weightsScheduleSelector");


let currentProfile = "medica";
let currentSchedule = "restringido";


function updatePrices(profile) {

    const data = prices[profile];

    currentProfile = profile;

    selectedProfile.textContent = data.name;

    priceAnnual.textContent = data.annual;

    annualDescription.textContent =
        data.annualDescription;

    priceFunctional.textContent =
        data.functional;

    functionalDescription.textContent =
        data.functionalDescription;


    /*
       Si el perfil tiene horario abierto y restringido,
       mostramos el selector.
    */

    const hasMultipleSchedules =
        data.weights.abierto !== undefined;


    if (hasMultipleSchedules) {

        weightsScheduleSelector.style.display =
            "block";

        updateWeightsPrice();

    } else {

        weightsScheduleSelector.style.display =
            "none";

        priceWeights.textContent =
            data.weights.restringido.price;

        weightsDescription.textContent =
            data.weights.restringido.description;
    }
}


function updateWeightsPrice() {

    const data =
        prices[currentProfile]
            .weights[currentSchedule];

    if (!data) return;

    priceWeights.textContent =
        data.price;

    weightsDescription.textContent =
        data.description;
}

profileButtons.forEach(button => {

    button.addEventListener("click", () => {

        profileButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const profile =
            button.dataset.profile;

        currentSchedule = "restringido";

        document
            .querySelectorAll(".schedule-btn")
            .forEach(btn =>
                btn.classList.remove("active")
            );

        document
            .querySelector(
                '.schedule-btn[data-schedule="restringido"]'
            )
            ?.classList.add("active");

        updatePrices(profile);

    });

});

document
    .querySelectorAll(".schedule-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".schedule-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            currentSchedule =
                button.dataset.schedule;

            updateWeightsPrice();

        });

    });


/* Estado inicial */

updatePrices("medica");

// Año automático en footer
document.querySelector("#year").textContent = new Date().getFullYear();

// Botón volver arriba
const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Cerrar el menú móvil al seleccionar una sección
document.querySelectorAll("#mainNav .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.querySelector("#mainNav");
    const bsCollapse = bootstrap.Collapse.getInstance(nav);

    if (bsCollapse) {
      bsCollapse.hide();
    }
  });
});
