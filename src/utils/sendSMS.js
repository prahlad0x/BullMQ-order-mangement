// Example placeholder for SMS integration
export async function sendSMS(phone, message) {
  try {
    // Replace this with your real SMS API integration
    console.log(`[sendSMS] Sending SMS to ${phone}: ${message}`);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (err) {
    console.error(`[sendSMS] Failed to send SMS to ${phone}:`, err.message);
    throw err;
  }
}
