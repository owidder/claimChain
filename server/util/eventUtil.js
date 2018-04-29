const events = [];

const eventsAsString = [];

const checkForDouble = (event) => {
    const eventAsString = JSON.stringify(event);
    if(eventsAsString.indexOf(eventAsString) > -1) {
        console.warn("Double event!");
    }
    else {
        eventsAsString.push(eventAsString);
    }
}

const saveEvent = (event) => {
    checkForDouble(event);
    console.log(">>> save event >>>");
    console.log(event);
    events.push(event);
    console.log("<<< save event <<<");
}

const getAllEvents = () => {
    return events;
}

module.exports = {
    saveEvent, getAllEvents
}
