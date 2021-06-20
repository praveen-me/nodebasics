
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

class InMemoryDatabase<T extends BaseRecord> implements Database<T> {
    private db: Record<string, T> = {}

    public set(newValue: T): void {
        this.db[newValue.key] = newValue 
    }

    public get(key: string): T {
        return this.db[key]
    }
}

const pokemonDB = new InMemoryDatabase<Pokemon>()

pokemonDB.set({
    key: 'Apple',
    attack: 100,
    defense: 45
})

pokemonDB.set({
    key: 'Banana',
    attack: 80,
    defense: 100
})

console.log(pokemonDB.get('Apple'))