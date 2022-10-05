import ReactDOM from "react-dom";

export const showNotification = (component: React.ReactElement, duration?: number): void => {
    const hideAfter = duration ? duration > 0 ? duration : 5000 : 5000;

    const id = 'notification-root';

    let notificationContainer = document.getElementById(id);
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        // styling
        notificationContainer.style.width = '100%';
        notificationContainer.style.height = '100%';
        notificationContainer.style.position = 'absolute';
        notificationContainer.style.top = '0';
        notificationContainer.style.left = '0';
        notificationContainer.id = id;

        document.body.appendChild(notificationContainer);
    }

    ReactDOM.render(
        component,
        document.getElementById(id)
    );

    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(document.getElementById(id));
    }, hideAfter);
}