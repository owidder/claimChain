const events = [];

const saveEvent = (event) => {
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
