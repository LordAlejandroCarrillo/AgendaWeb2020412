export const saveData = () => {
    const userName = document.getElementById('name')
    const userLastName = document.getElementById('lastName').value

    const formData = {
        userName : userName,
        userLastName : userLastName
    }

    return formData
}