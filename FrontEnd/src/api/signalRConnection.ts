import * as signalR from "@microsoft/signalr";

// Create and configure the SignalR connection
const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7239/auctionHub") // backend hub endpoint
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default hubConnection;
