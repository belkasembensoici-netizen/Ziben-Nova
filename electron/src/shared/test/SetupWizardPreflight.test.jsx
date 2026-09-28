import { describe, expect, it } from 'vitest';
import { preflightCheckDetail } from '../pages/SetupWizard';

describe('preflightCheckDetail', () => {
  it('shows the 5 GB threshold when a disk check contains a stale value', () => {
    expect(
      preflightCheckDetail({
        id: 'disk',
        detail: '0.9 GB free at C:/cache (need ≥ 10 GB)',
      }),
    ).toBe('0.9 GB free at C:/cache (need ≥ 5 GB)');
  });

  it('leaves non-disk checks and passing disk details unchanged', () => {
    expect(preflightCheckDetail({ id: 'ram', detail: '8 GB total (need ≥ 10 GB)' })).toBe(
      '8 GB total (need ≥ 10 GB)',
    );
    expect(preflightCheckDetail({ id: 'disk', detail: '12.0 GB free at C:/cache' })).toBe(
      '12.0 GB free at C:/cache',
    );
  });
});