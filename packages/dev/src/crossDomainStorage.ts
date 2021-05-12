const createGuest = require("cross-domain-storage/guest");
// let the guest connect to the host
const crossDomainStorage = createGuest("https://localhost:4567");

export function getStorage() {
    return crossDomainStorage;
}
