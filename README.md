# Video-Calling-WebApp-WebRTC

A Web Application that enables us to connect with out friends or co-workers through group Video Call.

## Technologies used
- React
- ExpressJS
- Socket.io

## Concepts Involved
- Socket:
Tracks user status between client and server.

- WebRTC:
To enable Real Time connection by streaming our media (A/V) to other users.

- PeerJS:
This application sends media directly to the peers connected in the peer Network ( Room ).
Data is transmitted in a P2P Network for which PeerJS has been utilised.

## Procedure
1. Run `npm start` in your terminal in both your client and server directories.
2. Client runs on port 3000 in the local machine.
3. Go to localhost/3000 in your desired browser.
4. Select HostVC to host a meeting Room.
5. Give your name and click on 'HOST'.
6. Your generated Room ID will appear on the top.
7. Other users can join your meeting room by entering this Room ID while they follow JoinVC steps.
8. Toggle Audio/Video as per your wish.
