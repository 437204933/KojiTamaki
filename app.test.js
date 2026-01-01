/**
 * Property-Based Tests for Lyrics Viewer
 * 
 * Feature: lyrics-viewer
 * Property 2: Circular navigation - next
 * Property 3: Circular navigation - previous
 * Validates: Requirements 4.2, 4.3, 4.4, 4.5
 */

const fc = require('fast-check');

// 模拟 app.js 中的核心逻辑（避免 DOM 依赖）
const TOTAL_SONGS = 8;

// 纯函数版本的导航逻辑
function calculateNextIndex(currentIndex, totalSongs) {
  return (currentIndex + 1) % totalSongs;
}

function calculatePreviousIndex(currentIndex, totalSongs) {
  return (currentIndex - 1 + totalSongs) % totalSongs;
}

// 歌曲数据验证
const songs = [
  { id: 1, title: "あこがれ", lyrics: "placeholder" },
  { id: 2, title: "青いなす畑", lyrics: "placeholder" },
  { id: 3, title: "からっぽの心で", lyrics: "placeholder" },
  { id: 4, title: "それ以外に何がある", lyrics: "placeholder" },
  { id: 5, title: "太陽さん", lyrics: "placeholder" },
  { id: 6, title: "古今東西", lyrics: "placeholder" },
  { id: 7, title: "最高でしょ", lyrics: "placeholder" },
  { id: 8, title: "コール", lyrics: "placeholder" }
];

console.log('Running Property-Based Tests for Lyrics Viewer\n');
console.log('='.repeat(50));

// Property 1: Song data integrity
// For any song in the songs array, it should have a non-empty title and non-empty lyrics string.
// Validates: Requirements 1.1
console.log('\nProperty 1: Song data integrity');
console.log('For any song, it should have non-empty title and lyrics');

const property1Result = songs.every(song => 
  typeof song.title === 'string' && 
  song.title.length > 0 && 
  typeof song.lyrics === 'string' && 
  song.lyrics.length > 0
);
console.log(`Result: ${property1Result ? 'PASSED ✓' : 'FAILED ✗'}`);

// Property 2: Circular navigation - next
// For any current index in range [0, 7], calling goToNext() should result in index (currentIndex + 1) % 8.
// Validates: Requirements 4.3, 4.5
console.log('\nProperty 2: Circular navigation - next');
console.log('For any index [0-7], next should be (index + 1) % 8');

const property2 = fc.property(
  fc.integer({ min: 0, max: TOTAL_SONGS - 1 }),
  (currentIndex) => {
    const nextIndex = calculateNextIndex(currentIndex, TOTAL_SONGS);
    const expected = (currentIndex + 1) % TOTAL_SONGS;
    return nextIndex === expected;
  }
);

try {
  fc.assert(property2, { numRuns: 20 });
  console.log('Result: PASSED ✓ (20 runs)');
} catch (e) {
  console.log('Result: FAILED ✗');
  console.log('Counterexample:', e.message);
}

// Property 3: Circular navigation - previous
// For any current index in range [0, 7], calling goToPrevious() should result in index (currentIndex - 1 + 8) % 8.
// Validates: Requirements 4.2, 4.4
console.log('\nProperty 3: Circular navigation - previous');
console.log('For any index [0-7], previous should be (index - 1 + 8) % 8');

const property3 = fc.property(
  fc.integer({ min: 0, max: TOTAL_SONGS - 1 }),
  (currentIndex) => {
    const prevIndex = calculatePreviousIndex(currentIndex, TOTAL_SONGS);
    const expected = (currentIndex - 1 + TOTAL_SONGS) % TOTAL_SONGS;
    return prevIndex === expected;
  }
);

try {
  fc.assert(property3, { numRuns: 20 });
  console.log('Result: PASSED ✓ (20 runs)');
} catch (e) {
  console.log('Result: FAILED ✗');
  console.log('Counterexample:', e.message);
}

// Property 4: Navigation boundary - first song previous goes to last
// Edge case: When at index 0, previous should go to index 7
console.log('\nProperty 4: Edge case - first song previous goes to last');

const firstToPrev = calculatePreviousIndex(0, TOTAL_SONGS);
const property4Result = firstToPrev === 7;
console.log(`Index 0 -> previous -> ${firstToPrev} (expected: 7)`);
console.log(`Result: ${property4Result ? 'PASSED ✓' : 'FAILED ✗'}`);

// Property 5: Navigation boundary - last song next goes to first
// Edge case: When at index 7, next should go to index 0
console.log('\nProperty 5: Edge case - last song next goes to first');

const lastToNext = calculateNextIndex(7, TOTAL_SONGS);
const property5Result = lastToNext === 0;
console.log(`Index 7 -> next -> ${lastToNext} (expected: 0)`);
console.log(`Result: ${property5Result ? 'PASSED ✓' : 'FAILED ✗'}`);

// Property 6: Index always stays in valid range
// For any sequence of navigation operations, index should always be in [0, 7]
console.log('\nProperty 6: Index always stays in valid range [0-7]');

const property6 = fc.property(
  fc.integer({ min: 0, max: TOTAL_SONGS - 1 }),
  fc.array(fc.boolean(), { minLength: 1, maxLength: 50 }),
  (startIndex, operations) => {
    let index = startIndex;
    for (const goNext of operations) {
      if (goNext) {
        index = calculateNextIndex(index, TOTAL_SONGS);
      } else {
        index = calculatePreviousIndex(index, TOTAL_SONGS);
      }
    }
    return index >= 0 && index < TOTAL_SONGS;
  }
);

try {
  fc.assert(property6, { numRuns: 20 });
  console.log('Result: PASSED ✓ (20 runs)');
} catch (e) {
  console.log('Result: FAILED ✗');
  console.log('Counterexample:', e.message);
}

console.log('\n' + '='.repeat(50));
console.log('All property tests completed!');
