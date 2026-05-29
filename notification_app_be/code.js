
const API_URL =
  "http://4.224.187.222/evaluation-service/notifications";

// Type priority weights
const TYPE_WEIGHTS = {
  PLACEMENT: 100,
  RESULT: 70,
  EVENT: 40,
};

// User configurable
const TOP_N = 10;

// Maximum age window considered for recency boost
const MAX_AGE_HOURS = 72;

// Fetch notifications from API
async function fetchNotifications(token) {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch notifications: ${response.status}`
      );
    }

    const data = await response.json();

    return data.notifications || [];
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    return [];
  }
}

// Calculate priority score
function calculatePriority(notification) {
  const typeWeight =
    TYPE_WEIGHTS[notification.type] || 10;

  const now = new Date();

  const notificationTime = new Date(
    notification.TimeStamp
  );

  const ageInMilliseconds =
    now - notificationTime;

  const ageInHours =
    ageInMilliseconds / (1000 * 60 * 60);

  // More recent notifications get higher score
  const recencyScore = Math.max(
    0,
    MAX_AGE_HOURS - ageInHours
  );

  return typeWeight + recencyScore;
}

// Get top priority notifications
function getTopNotifications(
  notifications,
  topN = TOP_N
) {
  const scoredNotifications = notifications.map(
    (notification) => ({
      ...notification,
      priorityScore:
        calculatePriority(notification),
    })
  );

  scoredNotifications.sort(
    (a, b) => b.priorityScore - a.priorityScore
  );

  return scoredNotifications.slice(0, topN);
}

// Main execution function
async function main() {
  const token = "YOUR_ACCESS_TOKEN";

  const notifications =
    await fetchNotifications(token);

  const topNotifications =
    getTopNotifications(notifications, 10);

  console.log(
    "Top Priority Notifications:"
  );

  console.table(
    topNotifications.map((notification) => ({
      ID: notification.ID,
      Type: notification.type,
      Message: notification.message,
      TimeStamp: notification.TimeStamp,
      PriorityScore:
        notification.priorityScore.toFixed(2),
    }))
  );
}

