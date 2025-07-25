import QuizSocket from './components/QuizSocket';

export default function RoomPage({params}: {
  params: { id: string } }){
     const { id } = params; 
  return (
    <div>
      <h1>WebSocket Demo</h1>
      <h1>Room ID: {id}</h1>
      <QuizSocket />
    </div>
  );
}