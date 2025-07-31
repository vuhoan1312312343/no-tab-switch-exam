const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
  console.log("🔌 Một client đã kết nối");

  ws.warningCount = 0;

  ws.on('message', function incoming(message) {
    ws.warningCount++;
    let reply = "";

    if (ws.warningCount === 1) {
      reply = "⚠️ Cảnh báo: Bạn vừa chuyển tab! (Lần 1)";
    } else if (ws.warningCount === 2) {
      reply = "⛔ Bạn đã chuyển tab 2 lần. Bài thi bị hủy!";
    }

    console.log("📩 Từ client:", message.toString());
    ws.send(reply);
  });

  ws.on('close', () => {
    console.log("❌ Client đã ngắt kết nối");
  });
});

console.log("🚀 Server WebSocket đang chạy tại ws://localhost:3000");
