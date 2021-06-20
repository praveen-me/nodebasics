interface Pokemon {
    key: number | string;
    attack: number;
    defense: number
}

interface BaseRecord {
    key: string | number
}

interface Database<T extends BaseRecord> {
    get(key: string): T | undefined
    set(newValue: T): void
}

// 1 - Factory Pattern
function createDatabase<T extends BaseRecord>() {
    // Singleton 
    return class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {}
    
        static instance = new InMemoryDatabase()
    
        private constructor(){}
    
        public set(newValue: T): void {
            this.db[newValue.key] = newValue 
        }
    
        public get(key: string): T {
            return this.db[key]
        }
    }

}

const pokemonDB = createDatabase<Pokemon>()

const secondPokemon = pokemonDB

pokemonDB.instance.set({
    key: 'Apple',
    attack: 100,
    defense: 45
})

pokemonDB.instance.set({
    key: 'Banana',
    attack: 80,
    defense: 100
})

console.log(pokemonDB.instance.get('Apple'))