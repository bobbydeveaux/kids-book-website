import React from 'react';
import Grid from './Grid';

// Example usage of the Grid component
export const GridExamples = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Grid Component Examples</h2>

      {/* Default Grid - 1 column mobile, 2 tablet, 3 desktop */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Default Grid (1/2/3 columns)</h3>
        <Grid>
          <div style={{ backgroundColor: '#f0f0f0', padding: '1rem' }}>Item 1</div>
          <div style={{ backgroundColor: '#e0e0e0', padding: '1rem' }}>Item 2</div>
          <div style={{ backgroundColor: '#f0f0f0', padding: '1rem' }}>Item 3</div>
          <div style={{ backgroundColor: '#e0e0e0', padding: '1rem' }}>Item 4</div>
          <div style={{ backgroundColor: '#f0f0f0', padding: '1rem' }}>Item 5</div>
          <div style={{ backgroundColor: '#e0e0e0', padding: '1rem' }}>Item 6</div>
        </Grid>
      </section>

      {/* Custom Column Configuration */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Custom Columns (2/3/4 columns)</h3>
        <Grid columns={{ mobile: 2, tablet: 3, desktop: 4 }}>
          <div style={{ backgroundColor: '#ffebcd', padding: '1rem' }}>Item 1</div>
          <div style={{ backgroundColor: '#ffd7cd', padding: '1rem' }}>Item 2</div>
          <div style={{ backgroundColor: '#ffebcd', padding: '1rem' }}>Item 3</div>
          <div style={{ backgroundColor: '#ffd7cd', padding: '1rem' }}>Item 4</div>
          <div style={{ backgroundColor: '#ffebcd', padding: '1rem' }}>Item 5</div>
          <div style={{ backgroundColor: '#ffd7cd', padding: '1rem' }}>Item 6</div>
          <div style={{ backgroundColor: '#ffebcd', padding: '1rem' }}>Item 7</div>
          <div style={{ backgroundColor: '#ffd7cd', padding: '1rem' }}>Item 8</div>
        </Grid>
      </section>

      {/* Small Gap */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Small Gap</h3>
        <Grid gap="small" columns={{ mobile: 2, tablet: 2, desktop: 3 }}>
          <div style={{ backgroundColor: '#d4edda', padding: '1rem' }}>Item 1</div>
          <div style={{ backgroundColor: '#c3e6cb', padding: '1rem' }}>Item 2</div>
          <div style={{ backgroundColor: '#d4edda', padding: '1rem' }}>Item 3</div>
          <div style={{ backgroundColor: '#c3e6cb', padding: '1rem' }}>Item 4</div>
          <div style={{ backgroundColor: '#d4edda', padding: '1rem' }}>Item 5</div>
          <div style={{ backgroundColor: '#c3e6cb', padding: '1rem' }}>Item 6</div>
        </Grid>
      </section>

      {/* Large Gap */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Large Gap</h3>
        <Grid gap="large" columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
          <div style={{ backgroundColor: '#f8d7da', padding: '1rem' }}>Item 1</div>
          <div style={{ backgroundColor: '#f5c6cb', padding: '1rem' }}>Item 2</div>
          <div style={{ backgroundColor: '#f8d7da', padding: '1rem' }}>Item 3</div>
        </Grid>
      </section>

      {/* Single Column */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Single Column (All Breakpoints)</h3>
        <Grid columns={{ mobile: 1, tablet: 1, desktop: 1 }}>
          <div style={{ backgroundColor: '#d1ecf1', padding: '1rem' }}>Full Width Item 1</div>
          <div style={{ backgroundColor: '#bee5eb', padding: '1rem' }}>Full Width Item 2</div>
          <div style={{ backgroundColor: '#d1ecf1', padding: '1rem' }}>Full Width Item 3</div>
        </Grid>
      </section>

      {/* Four Columns */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Four Columns (Desktop Only)</h3>
        <Grid columns={{ mobile: 2, tablet: 3, desktop: 4 }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: i % 2 === 0 ? '#e2d5f1' : '#d4b5f0',
                padding: '1rem'
              }}
            >
              Item {i + 1}
            </div>
          ))}
        </Grid>
      </section>
    </div>
  );
};

export default GridExamples;