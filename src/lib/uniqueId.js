const idHash = {};

export default function uniqueId(prefix = 'uniqueId_') {
  if (!idHash[prefix]) {
    idHash[prefix] = 1;
  }

  return prefix + (idHash[prefix]++);
}
