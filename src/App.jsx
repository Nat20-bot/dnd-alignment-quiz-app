import React, { useMemo, useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'A new kid is getting picked on at school. What do you do?',
    options: [
      { key: 'A', text: 'Step in, but handle it properly and get help from an adult.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Help quietly in a smart, low-drama way.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Jump in immediately, even if it causes chaos.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Stay out of it unless it affects you or your friends.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Use the situation to get attention or gain something.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 2,
    text: 'You think a rule is unfair. What is your usual reaction?',
    options: [
      { key: 'A', text: 'Follow it, but challenge it respectfully.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Usually follow it unless there is a really good reason not to.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Break it if it gets in the way of what feels right.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Ignore it if you can get away with it.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Break it just because rules are annoying.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 3,
    text: 'You find a wallet with money in it. What do you do?',
    options: [
      { key: 'A', text: 'Return it properly, with everything inside.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Return it because it is the right thing to do.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Return it, but in your own unconventional way.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Keep the money if no one will know.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Take it and not feel bad.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 4,
    text: 'A friend asks for help with homework they forgot to do.',
    options: [
      { key: 'A', text: 'Help them learn it, but not cheat.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Help as much as possible without causing trouble.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Help however needed, even if it bends the rules.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Help only if there is something in it for you.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Give wrong answers for a laugh or to mess with them.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 5,
    text: 'If you were part of a team, what kind of teammate would you be?',
    options: [
      { key: 'A', text: 'Reliable, fair, and follows the plan.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Helpful and steady, but not bossy.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Creative, bold, and does what works in the moment.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Helpful only when it suits you.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'You like stirring the pot or taking control.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 6,
    text: 'Someone weaker needs help, but helping them will get you in trouble.',
    options: [
      { key: 'A', text: 'Help, but try to do it the proper way.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Help because it is the right thing to do.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Help first, worry about the consequences later.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Only help if it will not cost too much.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Probably not help unless there is a benefit.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 7,
    text: 'What matters more to you?',
    options: [
      { key: 'A', text: 'Duty and doing what is right.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Being decent and fair.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Freedom and doing what feels right.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Looking after yourself and your own people.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Winning.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 8,
    text: 'If you had power, what would you most likely do with it?',
    options: [
      { key: 'A', text: 'Protect people and keep things fair.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Help where you can and avoid abusing it.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Use it to help others, but on your own terms.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Use it mainly for yourself and those close to you.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Use it to control people or get ahead.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 9,
    text: 'You see someone cheating in a game.',
    options: [
      { key: 'A', text: 'Report it or call it out fairly.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Dislike it, but handle it calmly.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Call it out loudly and shake things up.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Ignore it unless it affects you.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Respect it if it is clever.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 10,
    text: 'Which sounds most like you?',
    options: [
      { key: 'A', text: 'There is a right way to do things.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Just be a good person.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Rules should not stop you doing the right thing.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Look after yourself first.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Power matters more than fairness.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 11,
    text: 'If you make a promise, how seriously do you take it?',
    options: [
      { key: 'A', text: 'Very seriously. A promise is a promise.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Seriously, unless something important changes.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'You mean it, but you will not let it trap you.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Depends on whether keeping it still benefits you.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Promises are useful until they are not.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
  {
    id: 12,
    text: 'In an argument, what are you most likely to do?',
    options: [
      { key: 'A', text: 'Stay calm and fair.', order: { lawful: 2 }, moral: { good: 2 } },
      { key: 'B', text: 'Try to understand both sides.', order: { neutral: 1 }, moral: { good: 2 } },
      { key: 'C', text: 'Speak honestly and directly, even if it causes sparks.', order: { chaotic: 2 }, moral: { good: 1 } },
      { key: 'D', text: 'Push for what benefits you.', order: { neutral: 1 }, moral: { neutral: 1 } },
      { key: 'E', text: 'Say whatever gives you the upper hand.', order: { chaotic: 2 }, moral: { evil: 2 } },
    ],
  },
];

const descriptions = {
  'Lawful Good': 'You care about doing the right thing and believe structure, responsibility, and fairness matter.',
  'Neutral Good': 'You want to help people and do what is right, without being too rigid about rules.',
  'Chaotic Good': 'You have a good heart and strong values, but you prefer freedom over strict rules.',
  'Lawful Neutral': 'You value order, discipline, and doing things properly, even when emotions pull in another direction.',
  'True Neutral': 'You are balanced, practical, and usually decide based on the situation in front of you.',
  'Chaotic Neutral': 'You value independence and freedom, and you do not like being boxed in by other people\'s rules.',
  'Lawful Evil': 'You are strategic and controlled, and you know how to use rules and systems to your advantage.',
  'Neutral Evil': 'You are focused on results and self-interest, without much concern for rules or fairness.',
  'Chaotic Evil': 'You reject control, act on impulse, and may create disruption simply because you can.',
};

function scoreAnswers(answers) {
  let lawful = 0;
  let chaotic = 0;
  let orderNeutral = 0;
  let good = 0;
  let evil = 0;
  let moralNeutral = 0;

  questions.forEach((question) => {
    const option = question.options.find((item) => item.key === answers[question.id]);
    if (!option) return;

    lawful += option.order.lawful || 0;
    chaotic += option.order.chaotic || 0;
    orderNeutral += option.order.neutral || 0;

    good += option.moral.good || 0;
    evil += option.moral.evil || 0;
    moralNeutral += option.moral.neutral || 0;
  });

  let orderAxis = 'Neutral';
  if (lawful > chaotic && lawful >= orderNeutral) orderAxis = 'Lawful';
  else if (chaotic > lawful && chaotic >= orderNeutral) orderAxis = 'Chaotic';

  let moralAxis = 'Neutral';
  if (good > evil && good >= moralNeutral) moralAxis = 'Good';
  else if (evil > good && evil >= moralNeutral) moralAxis = 'Evil';

  const alignment = orderAxis === 'Neutral' && moralAxis === 'Neutral'
    ? 'True Neutral'
    : `${orderAxis} ${moralAxis}`;

  return {
    alignment,
    description: descriptions[alignment],
    scores: { lawful, chaotic, orderNeutral, good, evil, moralNeutral },
  };
}

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const canSubmit = answeredCount === questions.length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const result = useMemo(() => (submitted ? scoreAnswers(answers) : null), [answers, submitted]);

  function selectAnswer(questionId, optionKey) {
    setAnswers((current) => ({ ...current, [questionId]: optionKey }));
  }

  function resetQuiz() {
    setAnswers({});
    setSubmitted(false);
    setPlayerName('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function shareResult() {
    if (!result) return;
    const text = `${playerName || 'I'} got ${result.alignment} on the D&D Alignment Quiz.`;

    if (navigator.share) {
      navigator.share({ title: 'D&D Alignment Quiz', text }).catch(() => {});
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      alert('Result copied to clipboard.');
    }).catch(() => {
      alert(text);
    });
  }

  return (
    <div className="page-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <main className="container">
        <section className="hero card">
          <p className="eyebrow">Free MVP • Vercel Ready</p>
          <h1>D&D Alignment Quiz</h1>
          <p className="hero-copy">
            A polished starter app you can deploy for free, share with friends, and build into a real product later.
          </p>

          <div className="hero-grid">
            <div className="mini-card">
              <strong>12 questions</strong>
              <span>Fast enough to finish before the tea gets cold.</span>
            </div>
            <div className="mini-card">
              <strong>Instant result</strong>
              <span>Scores both alignment axes automatically.</span>
            </div>
            <div className="mini-card">
              <strong>Shareable</strong>
              <span>Copy or share the result in one tap.</span>
            </div>
          </div>

          <label className="name-field">
            <span>Name or nickname (optional)</span>
            <input
              type="text"
              placeholder="e.g. Fatsie the Brave"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
          </label>
        </section>

        <section className="card sticky-progress">
          <div>
            <p className="progress-label">Quest progress</p>
            <p className="progress-text">{answeredCount} / {questions.length} answered</p>
          </div>
          <div className="progress-wrap">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>{progress}%</span>
          </div>
        </section>

        {!submitted ? (
          <section className="question-list">
            {questions.map((question) => (
              <article key={question.id} className="card question-card">
                <h2>{question.id}. {question.text}</h2>
                <div className="options-grid">
                  {question.options.map((option) => {
                    const selected = answers[question.id] === option.key;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        className={`option-button ${selected ? 'selected' : ''}`}
                        onClick={() => selectAnswer(question.id, option.key)}
                      >
                        <span className="option-key">{option.key}</span>
                        <span className="option-text">{option.text}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}

            <div className="actions">
              <button type="button" className="primary-button" disabled={!canSubmit} onClick={() => setSubmitted(true)}>
                Reveal Alignment
              </button>
              <button type="button" className="secondary-button" onClick={resetQuiz}>
                Reset Quiz
              </button>
            </div>
          </section>
        ) : (
          <section className="card result-card">
            <p className="eyebrow">Result Unlocked</p>
            <h2>{playerName ? `${playerName}, you are` : 'You are'} {result.alignment}</h2>
            <p className="result-copy">{result.description}</p>

            <div className="score-grid">
              <div className="score-box">
                <h3>Order Axis</h3>
                <p>Lawful: <strong>{result.scores.lawful}</strong></p>
                <p>Neutral: <strong>{result.scores.orderNeutral}</strong></p>
                <p>Chaotic: <strong>{result.scores.chaotic}</strong></p>
              </div>
              <div className="score-box">
                <h3>Moral Axis</h3>
                <p>Good: <strong>{result.scores.good}</strong></p>
                <p>Neutral: <strong>{result.scores.moralNeutral}</strong></p>
                <p>Evil: <strong>{result.scores.evil}</strong></p>
              </div>
            </div>

            <div className="actions">
              <button type="button" className="primary-button" onClick={shareResult}>
                Share Result
              </button>
              <button type="button" className="secondary-button" onClick={() => setSubmitted(false)}>
                Edit Answers
              </button>
              <button type="button" className="secondary-button" onClick={resetQuiz}>
                Start Over
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
