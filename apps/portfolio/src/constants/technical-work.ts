export interface TechnicalProject {
  id: string;
  name: string;
  role: string;
  img: string;
}

export const TECHNICAL_PROJECTS: TechnicalProject[] = [
  { id: '02', name: 'CEDRA HUB', role: 'Smart Contract', img: '/project2.jpg' },
];

export const TECHNICAL_WORK_META = {
  title: 'Selected Works (2024-2025)',
  previewPlaceholder: '[Project Preview]',
};
