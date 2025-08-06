export async function sendConfiguration(config: string[]): Promise<void> {
    console.log("Sending configuration:", config);
    const res = await fetch("http://localhost:3000/config/changeConfiguration", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });
  
    if (!res.ok) {
      throw new Error("Failed to send config");
    }
  }

  export async function getLiquidOptions(): Promise<string[]> {
    const liquidOptions = [
      "Water",
      "Vodka",
      "Rum",
      "Cola",
      "Juice",
      "Gin",
      "Whiskey",
      "Tonic",
      "Lemonade",
      "Tequila",
      "Orange Juice",
    ];
    return liquidOptions;
}
  