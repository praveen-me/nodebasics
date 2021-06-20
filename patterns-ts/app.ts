interface Pokemon {
    key: number | string;
    attack: number;
    defense: number
}

interface BaseRecord {
    key: string | number
}

type Listener<EventType> = (ev: EventType) => void

// Observer Pattern
function createOberserver<EventType>(): {
    subscribe: (listener: Listener<EventType>) => () => void;
    publish: (eventType: EventType) => void
} {
    let listeners: Listener<EventType>[] = []
    return {
        subscribe(listener: Listener<EventType>): () => void {
            listeners.push(listener)

            return () => {
                listeners = listeners.filter(l => l !== listener)
            }
        },
        publish(eventType: EventType) {
            listeners.forEach(l => l(eventType))
        }
    }
}
interface BeforeSetEvent<T> {
    value: T,
    newValue: T
}
interface AfterSetEvent<T> {
    value: T,
}

interface Database<T extends BaseRecord> {
    get(key: string): T | undefined
    set(newValue: T): void
    onBeforeSet(listener: Listener<BeforeSetEvent<T>>): () => void 
    onAfterSet(listener: Listener<AfterSetEvent<T>>): void
    visit(visitor: (item: T) => void): void
    selectBest(scoreStratergy: (item: T) => number): T | undefined
}

// 1 - Factory Pattern
function createDatabase<T extends BaseRecord>() {
    // Singleton 
    return class InMemoryDatabase implements Database<T> {
        private db: Record<string, T> = {}
    
        static instance:InMemoryDatabase = new InMemoryDatabase()
    
        private constructor(){}

        private beforeObserver = createOberserver<BeforeSetEvent<T>>()
        private afterObserver = createOberserver<AfterSetEvent<T>>()
    
        public set(newValue: T): void {
            this.beforeObserver.publish({
                newValue,
                value: this.db[newValue.key]
            })

            this.db[newValue.key] = newValue 
            
            this.afterObserver.publish({
                value: this.db[newValue.key],
            })
        }
    
        public get(key: string): T {
            return this.db[key]
        }

        public onBeforeSet(listener: Listener<BeforeSetEvent<T>>): () => void {
           return this.beforeObserver.subscribe(listener) 
        }

        public onAfterSet(listener: Listener<AfterSetEvent<T>>) {
            return this.afterObserver.subscribe(listener)
        }

        // Visitor pattern
        public visit(visitor: (item: T) => void): void {
            Object.values(this.db).forEach(visitor)
        }

        // Stratergy
        public selectBest(scoreStratergy: (item: T) => number): T | undefined {
            let maxScore = 0;
            let bestItem;

            Object.values(this.db).forEach((item) => {
                if(maxScore < scoreStratergy(item)) {
                    maxScore = scoreStratergy(item);
                    bestItem = item
                }
            })

            return bestItem
        }
    }

}

const PokemonDB = createDatabase<Pokemon>()

const unSubscribeAfterSet = PokemonDB.instance.onAfterSet(({value}) => {
    console.log(value)
})

PokemonDB.instance.set({
    key: 'Apple',
    attack: 100,
    defense: 45
})

unSubscribeAfterSet()

PokemonDB.instance.set({
    key: 'Banana',
    attack: 80,
    defense: 100
})

PokemonDB.instance.visit((pokemon) => {
    console.log({pokemon})
})

const bestDefensivePokemon = PokemonDB.instance.selectBest((pokemon) => {
    return pokemon.defense
})

console.log({bestDefensivePokemon})