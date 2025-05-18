const POP_SIZE = 100;
const MUTATION_RATE = 0.05;
const CHARS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const MAX_GENERATIONS = 1000;

function randomChar(){
    return CHARS.charAt(Math.floor(Math.random() * CHARS.length));
}

function randomIndividual(){
    return Array.from({ length: TARGET.length}, randomChar).join('');
}

function fitness(ind) {
    return [...ind].filter((c, i) => c === TARGET[i]).length;
}

function mutate(ind){
    return [...ind].map(c => Math.random() < MUTATION_RATE ? randomChar() : c).join('');

}

function crossover(p1, p2){
    const pivot = Math.floor(Math.random() * TARGET.length);
    return p1.slice(0, pivot) + p2.slice(pivot);
}


function generateNext(population){
    const sorted = population.sort((a, b) => fitness(b) - fitness(a));
    const survivors = sorted.slice(0, POP_SIZE / 5);
    const newGen = [...survivors];
    while (newGen.length < POP_SIZE){
        const p1 = survivors[Math.floor(Math.random() * survivors.length)];
        const p2 = survivors[Math.floor(Math.random() * survivors.length)];

        newGen.push(mutate(crossover(p1, p2)));
    }

    return newGen;
}



function runGeneticAlgorithm(){
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    // Inicialización
    generation = 0;
    let population = Array.from({ length: POP_SIZE}, randomIndividual);
    function step(){
        const best = population.reduce((a, b) => fitness(a) > fitness(b) ? a : b);
        outputDiv.innerHTML += `Gen ${generation}: ${best} (fitness: ${fitness(best)})<br>`;
        if (best === TARGET || generation >= MAX_GENERATIONS){
            outputDiv.innerHTML += `<br><strong>¡Objetivo encontrado!</strong>`;
            return;

        }
        population = generateNext(population);
        generation++;
        setTimeout(step, 50);
    }

    step();
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("targetForm");
    form.addEventListener("submit", (e) => {
       e.preventDefault();
       const input = document.getElementById("targetInput");
       const value = input.value.trim().toUpperCase(); 
       if (value && /^[A-ZÑ]+$/.test(value)){
        TARGET = value;
        runGeneticAlgorithm();
       } else{
        alert("Por favor, escribe sin tilde y sin espaciado");
       }
    });
});