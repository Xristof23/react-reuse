import useLocalStorageState from "use-local-storage-state";

const initialProgress = [
  { id: 0, name: "aliens", count: 2 },
  { id: 1, name: "crystal", count: 0 },
  { id: 2, name: "crystalToMine", count: 2000 },
  { id: 3, name: "seeds", count: 10 },
];

function alienBreeding(a) {
  if (a <= 100) {
    return Math.round(a * 1.3);
  }
  return Math.round(a * 1.03);
}

export default function AlienPrototype() {
  const [progress, setProgress] = useLocalStorageState("progress", {
    defaultValue: initialProgress,
  });
  //   const newProgress = progress.map((prog) => prog.id === prog.id ?  {...progress, count: alienBreeding(prog.count)});
  console.log(progress);
  return <p>{alienBreeding(2)}</p>;
}
