import "../styles/notification.css"

const Notification = () => {
    // Example notifications data
    const notifications = [
        {
            id: 1,
            title: "New Item Added",
            message: "A new item has been added to your inventory.",
            timestamp: "5 mins ago"
        },
        {
            id: 2,
            title: "Sales Update",
            message: "Your total sales have increased by 10%.",
            timestamp: "2 hours ago"
        },
        {
            id: 3,
            title: "System Alert",
            message: "Scheduled maintenance at midnight.",
            timestamp: "1 day ago"
        }
    ];

    return (
        <div className="notification-main-container">
            <div className="notification-header">
                <h2>Notifications</h2>
                <button className="clear-btn">Clear All</button>
            </div>
            <div className="notification-list">
                {notifications.map(notification => (
                    <div key={notification.id} className="notification-item">
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-timestamp">{notification.timestamp}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notification;
