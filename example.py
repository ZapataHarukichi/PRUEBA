import random

# configuración
TARGET = "ESTERNOCLEIDO"
POPULATION_SIZE = 100
MUTATION_RATE = 0.05
GENERATIONS = 1000
CHARS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"

def random_individual(length):
    return ''.join(random.choice(CHARS) for _ in range(length))

def fitness(individual):
    return sum(1 for a, b in zip(individual, TARGET) if a == b)

def mutate(individual):
    return ''.join(
        c if random.random() > MUTATION_RATE else random.choice(CHARS)
        for c in individual
    )

def crossover(parent1, parent2):
    pivot = random.randint(0, len(TARGET) - 1)
    return parent1[:pivot] + parent2[pivot:]

# Inicializar población
population = [random_individual(len(TARGET)) for _ in range(POPULATION_SIZE)]

for generation in range(GENERATIONS):
    # Evaluar población
    scored = [(individual, fitness(individual)) for individual in population]
    scored.sort(key=lambda x: x[1], reverse=True)

    # Mostrar mejor individuo
    best = scored[0]
    print(f"Gen {generation}: {best[0]} (fitness: {best[1]})")

    if best[0] == TARGET:
        print("¡Palabra objetivo encontrada!")
        break

    # Selección de los mejores (top 20%)
    survivors = [ind for ind, _ in scored[:POPULATION_SIZE // 5]]

    # Nueva generación
    new_population = survivors[:]
    while len(new_population) < POPULATION_SIZE:
        parent1 = random.choice(survivors) 
        parent2 = random.choice(survivors)
        child = mutate(crossover(parent1, parent2))
        new_population.append(child)
    
    population = new_population
