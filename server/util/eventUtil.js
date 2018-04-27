const events = [];

const eventsAsString = [];

const checkForDouble = (event) => {
    const eventAsString = JSON.stringify(event);
    if(eventAsString.indexOf(eventAsString) > -1) {
        console.warn("Double event!");
    }
    else {
        eventAsString.push(eventAsString);
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
