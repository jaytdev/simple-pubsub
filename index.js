const topics = {}
let id = 0

const subscribe = (topic, handler) => {
    if (! topics.hasOwnProperty(topic)) {
        topics[topic] = []
    }

    id += 1

    topics[topic].push({ handler, id })

    return { topic, id }
};

const unsubscribe = ({ topic, id }) => {
    if (! topics.hasOwnProperty(topic)) return

    const i = topics[topic].findIndex(subscription => subscription.id === id)

    if (i >= 0) topics[topic].splice(i, 1)
}

const publish = (topic, data) => {
    if (! topics.hasOwnProperty(topic)) return

    topics[topic].forEach(subscription => subscription.handler(data))
}

export { publish, subscribe, unsubscribe }
