const storage = window.localStorage

if (!storage.getItem(`connections`)) {
    storage.setItem(`connections`, JSON.stringify([]));
}
import secureLocalStorage from "react-secure-storage";

export const AddNewConnection = (conName, conUsr, conIP, conPort, conPwrd) => {
    let connections = JSON.parse(window.localStorage.getItem('connections'))

    connections.forEach(function (item, index) {
        if (conName == "") {
            throw new Error('Fields Empty: conName')
        }

        if (conUsr == "") {
            throw new Error('Fields Empty: conUsr')
        }

        if (conIP == "") {
            throw new Error('Fields Empty: conIP')
        }

        if (conPort == "") {
            throw new Error('Fields Empty: conPort')
        }

        if (item.name == conName) {
            throw new Error('Failed: Name Exists Already');
        }
    });

    connections.push({
        name: conName,
        usr: conUsr,
        ip: conIP,
        port: conPort,
    })

    secureLocalStorage.setItem(`${conName}`, conPwrd);

    storage.setItem(`connections`, JSON.stringify(connections))

    return `Success: Connection Added with name: "${conName}", IP: "${conIP}"`
}

export const RemoveConnection = (conName) => {
    let connections = JSON.parse(window.localStorage.getItem('connections'))

    connections.forEach(function (item, index) {
        if (item.name === conName) {
            connections.splice(index, 1);

            secureLocalStorage.removeItem(conName)

            storage.setItem(`connections`, JSON.stringify(connections))
        }
    });

    return `Success: Connection Removed with name: "${conName}"`
}

export const ManageConnection = (conName, action, data) => {
    let connections = JSON.parse(window.localStorage.getItem('connections'))

    connections.forEach(function (item, index) {
        if (item.name === conName) {
            if (action == "rename") {
                connections[index].name = data

                storage.setItem(`connections`, JSON.stringify(connections))

                return `Success: Connection "${conName}" renamed to: "${data}"`
            }
        }
    });
}

export const getConnection = (conName) => {
    return new Promise(function (resolve, reject) {
        let connections = JSON.parse(window.localStorage.getItem('connections'))

        connections.forEach(function (item, index) {
            if (item.name == conName) {
                resolve(item)
            }
        });
    });
}