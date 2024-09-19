const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { name, email } = req.body;
    try {
      const zapierWebhookUrl =
        "https://hooks.zapier.com/hooks/catch/YOUR_ZAP_ID/";
      const response = await fetch(zapierWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        res
          .status(200)
          .json({
            message: "User successfully signed up and added to the workflow!",
          });
      } else {
        res
          .status(500)
          .json({ message: "Failed to add user to the workflow." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error occurred while adding user to Zapier." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
