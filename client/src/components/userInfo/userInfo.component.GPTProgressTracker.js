// import React from 'react';
// // import { Card, CardContent } from '../components/ui/card';
// // import { Progress } from '@/components/ui/progress';
// // import { Button } from '@/components/ui/button';
// // import { Clown, Tent, Star } from 'lucide-react';

// const performancesData = [
//   {
//     act: 'Limits & Continuity',
//     performances: [
//       { name: 'Understanding Limits', progress: 100 },
//       { name: 'Limit Laws', progress: 80 },
//       { name: 'Continuity', progress: 60 },
//     ],
//   },
//   {
//     act: 'Derivatives',
//     performances: [
//       { name: 'Derivative Rules', progress: 90 },
//       { name: 'Product & Quotient Rule', progress: 70 },
//       { name: 'Chain Rule', progress: 40 },
//     ],
//   },
//   {
//     act: 'Applications of Derivatives',
//     performances: [
//       { name: 'Maxima & Minima', progress: 20 },
//       { name: 'Concavity', progress: 0 },
//       { name: 'Related Rates', progress: 0 },
//     ],
//   },
// ];

// const ProgressTracker = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-100 p-6">
//       <div className="text-center mb-10">
//         <div className="flex justify-center items-center gap-2 text-3xl font-bold text-red-600">
//           <Tent size={32} /> Calculus Circus Progress <Clown size={32} />
//         </div>
//         <p className="text-gray-600">Track your acts and performances on the road to AP Calculus mastery!</p>
//       </div>
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//         {performancesData.map((act, index) => (
//           <Card key={index} className="bg-white shadow-xl rounded-2xl p-4">
//             <CardContent>
//               <h2 className="text-xl font-semibold text-red-500 mb-4 flex items-center gap-2">
//                 <Star size={20} className="text-yellow-500" /> Act {index + 1}: {act.act}
//               </h2>
//               <div className="space-y-3">
//                 {act.performances.map((perf, i) => (
//                   <div key={i}>
//                     <div className="flex justify-between text-sm font-medium">
//                       <span>{perf.name}</span>
//                       <span>{perf.progress}%</span>
//                     </div>
//                     <Progress value={perf.progress} className="h-2 bg-yellow-200" />
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 text-center">
//                 <Button className="bg-red-400 hover:bg-red-500 text-white">Continue Act</Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProgressTracker;