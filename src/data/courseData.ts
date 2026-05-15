import { Module, QuizQuestion } from '@/types';

export const courseModules: Module[] = [
  {
    _id: 'mod-1',
    title: 'CSS Fundamentals',
    description: 'Learn the basics of CSS — selectors, properties, values, and the cascade.',
    order: 1,
    isLocked: false,
    lessons: [
      {
        _id: 'lesson-1-1',
        moduleId: 'mod-1',
        title: 'What is CSS?',
        content: `<h2>What is CSS?</h2>
<p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. It controls the layout, colors, fonts, and overall visual appearance of web pages.</p>
<h3>Why Learn CSS?</h3>
<ul>
<li><strong>Essential for Web Development</strong> — Every website uses CSS</li>
<li><strong>Visual Design Control</strong> — Transform plain HTML into beautiful pages</li>
<li><strong>Responsive Design</strong> — Make websites work on all devices</li>
<li><strong>Animations & Effects</strong> — Create engaging user experiences</li>
</ul>
<h3>How CSS Works</h3>
<p>CSS works by associating rules with HTML elements. Each rule consists of a selector and a declaration block:</p>
<pre><code>selector {
  property: value;
}</code></pre>
<div class="example">
  <h4>Example:</h4>
  <pre><code>h1 {
  color: blue;
  font-size: 32px;
}</code></pre>
</div>`,
        order: 1,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-1-1',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What does CSS stand for?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Creative Style Sheets', isCorrect: false },
                { id: 'b', text: 'Cascading Style Sheets', isCorrect: true },
                { id: 'c', text: 'Computer Style Sheets', isCorrect: false },
                { id: 'd', text: 'Colorful Style Sheets', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'CSS stands for Cascading Style Sheets.'
            },
            {
              _id: 'q2',
              question: 'Which HTML tag is used to define internal CSS?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '<css>', isCorrect: false },
                { id: 'b', text: '<script>', isCorrect: false },
                { id: 'c', text: '<style>', isCorrect: true },
                { id: 'd', text: '<link>', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'The <style> tag is used for internal CSS.'
            },
            {
              _id: 'q3',
              question: 'CSS is used to control the visual presentation of web pages.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'Yes! CSS is specifically designed for visual presentation.'
            },
            {
              _id: 'q4',
              question: 'What is the correct CSS syntax?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'body { color: black; }', isCorrect: true },
                { id: 'b', text: '{ body: color = black }', isCorrect: false },
                { id: 'c', text: 'body: color = black', isCorrect: false },
                { id: 'd', text: '{ body; color: black }', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'The correct syntax is: selector { property: value; }'
            },
            {
              _id: 'q5',
              question: 'Which property is used to change text color?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'text-color', isCorrect: false },
                { id: 'b', text: 'font-color', isCorrect: false },
                { id: 'c', text: 'color', isCorrect: true },
                { id: 'd', text: 'text-style', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'The "color" property changes the text color in CSS.'
            }
          ]
        }
      },
      {
        _id: 'lesson-1-2',
        moduleId: 'mod-1',
        title: 'CSS Selectors',
        content: `<h2>CSS Selectors</h2>
<p>CSS selectors are used to find (select) the HTML elements you want to style. Understanding selectors is fundamental to writing effective CSS.</p>
<h3>Types of Selectors</h3>
<table>
  <tr><th>Selector</th><th>Example</th><th>Description</th></tr>
  <tr><td>Element</td><td>p</td><td>Selects all &lt;p&gt; elements</td></tr>
  <tr><td>Class</td><td>.intro</td><td>Selects elements with class="intro"</td></tr>
  <tr><td>ID</td><td>#header</td><td>Selects element with id="header"</td></tr>
  <tr><td>Universal</td><td>*</td><td>Selects all elements</td></tr>
  <tr><td>Attribute</td><td>[target]</td><td>Selects elements with target attribute</td></tr>
</table>
<h3>Combinators</h3>
<pre><code>/* Descendant: space */
div p { }

/* Direct child: > */
div > p { }

/* Adjacent sibling: + */
h1 + p { }

/* General sibling: ~ */
h1 ~ p { }</code></pre>`,
        order: 2,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-1-2',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'Which selector selects all elements with class="test"?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '#test', isCorrect: false },
                { id: 'b', text: '.test', isCorrect: true },
                { id: 'c', text: 'test', isCorrect: false },
                { id: 'd', text: '*[test]', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'Use a dot (.) prefix for class selectors.'
            },
            {
              _id: 'q2',
              question: 'What does the ">" combinator select?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'All descendants', isCorrect: false },
                { id: 'b', text: 'Direct children only', isCorrect: true },
                { id: 'c', text: 'Siblings', isCorrect: false },
                { id: 'd', text: 'Parent elements', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'The ">" combinator selects direct children only.'
            },
            {
              _id: 'q3',
              question: 'The universal selector (*) selects all elements on the page.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'The * selector matches every element on the page.'
            },
            {
              _id: 'q4',
              question: 'Which has higher specificity?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Class selector', isCorrect: false },
                { id: 'b', text: 'ID selector', isCorrect: true },
                { id: 'c', text: 'Element selector', isCorrect: false },
                { id: 'd', text: 'They are all equal', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'ID selectors have higher specificity than class or element selectors.'
            },
            {
              _id: 'q5',
              question: 'To select all elements with class "button", write the CSS selector: .____',
              type: 'code-completion',
              options: [
                { id: 'a', text: 'button', isCorrect: false },
                { id: 'b', text: '#button', isCorrect: false },
                { id: 'c', text: 'Button', isCorrect: false }
              ],
              correctAnswer: 'button',
              explanation: 'Class selectors use a dot prefix: .button'
            }
          ]
        }
      },
      {
        _id: 'lesson-1-3',
        moduleId: 'mod-1',
        title: 'The Cascade & Specificity',
        content: `<h2>The Cascade & Specificity</h2>
<p>When multiple CSS rules target the same element, the browser uses the <strong>cascade</strong> to determine which rule wins.</p>
<h3>Order of Priority (Lowest to Highest)</h3>
<ol>
  <li>Browser default styles</li>
  <li>External stylesheets</li>
  <li>Internal stylesheets</li>
  <li>Inline styles</li>
  <li><code>!important</code> declarations</li>
</ol>
<h3>Specificity Calculation</h3>
<p>Specificity is calculated based on the types of selectors used:</p>
<ul>
  <li><strong>Inline styles</strong>: 1000 points</li>
  <li><strong>ID selectors</strong>: 100 points</li>
  <li><strong>Class/attribute/pseudo-class selectors</strong>: 10 points</li>
  <li><strong>Element/pseudo-element selectors</strong>: 1 point</li>
</ul>
<pre><code>/* Specificity: 1, 2, 1 */
#nav .link:hover p { }

/* Specificity: 0, 3, 0 */
.container .main .text { }

/* Specificity: 0, 1, 2 */
.button.primary:hover { }</code></pre>`,
        order: 3,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-1-3',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What does the cascade determine in CSS?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'How to write CSS', isCorrect: false },
                { id: 'b', text: 'Which styles to apply when multiple rules target the same element', isCorrect: true },
                { id: 'c', text: 'The order of HTML elements', isCorrect: false },
                { id: 'd', text: 'How fast the page loads', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'The cascade determines which CSS rule wins when conflicts occur.'
            },
            {
              _id: 'q2',
              question: 'Which has the highest specificity?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '#id', isCorrect: false },
                { id: 'b', text: '.class', isCorrect: false },
                { id: 'c', text: 'element', isCorrect: false },
                { id: 'd', text: 'inline style', isCorrect: true }
              ],
              correctAnswer: 'd',
              explanation: 'Inline styles have the highest specificity (1000 points).'
            },
            {
              _id: 'q3',
              question: 'An ID selector has a specificity value of 100.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'ID selectors contribute 100 to the specificity calculation.'
            },
            {
              _id: 'q4',
              question: 'What does !important do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Makes a rule less important', isCorrect: false },
                { id: 'b', text: 'Overrides all other specificity rules', isCorrect: true },
                { id: 'c', text: 'Deletes other styles', isCorrect: false },
                { id: 'd', text: 'Makes the element invisible', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: '!important overrides all other specificity calculations.'
            },
            {
              _id: 'q5',
              question: 'What is the specificity of "div.container p"?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '0, 1, 2', isCorrect: true },
                { id: 'b', text: '0, 2, 1', isCorrect: false },
                { id: 'c', text: '1, 1, 1', isCorrect: false },
                { id: 'd', text: '0, 1, 1', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'One class (10) + two elements (2) = specificity 0, 1, 2'
            }
          ]
        }
      }
    ]
  },
  {
    _id: 'mod-2',
    title: 'Box Model & Layout',
    description: 'Master the CSS Box Model, positioning, and basic layout techniques.',
    order: 2,
    isLocked: true,
    lessons: [
      {
        _id: 'lesson-2-1',
        moduleId: 'mod-2',
        title: 'The Box Model',
        content: `<h2>The CSS Box Model</h2>
<p>Every element in CSS is a rectangular box. Understanding the box model is crucial for layout design.</p>
<h3>Components of the Box Model</h3>
<ul>
  <li><strong>Content</strong> — The actual content (text, images)</li>
  <li><strong>Padding</strong> — Space between content and border</li>
  <li><strong>Border</strong> — The border around padding</li>
  <li><strong>Margin</strong> — Space outside the border</li>
</ul>
<pre><code>.box {
  width: 200px;
  padding: 20px;
  border: 2px solid #333;
  margin: 10px;
  box-sizing: border-box;
}</code></pre>
<h3>Box-Sizing Property</h3>
<p><code>box-sizing: content-box</code> (default) — width/height only include content.</p>
<p><code>box-sizing: border-box</code> — width/height include padding and border. This is usually preferred!</p>`,
        order: 1,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-2-1',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What is the correct order of the box model from inside to outside?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Margin → Border → Padding → Content', isCorrect: false },
                { id: 'b', text: 'Content → Padding → Border → Margin', isCorrect: true },
                { id: 'c', text: 'Content → Border → Padding → Margin', isCorrect: false },
                { id: 'd', text: 'Padding → Content → Border → Margin', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'The correct order is Content → Padding → Border → Margin.'
            },
            {
              _id: 'q2',
              question: 'What does box-sizing: border-box do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Includes padding and border in the element\'s width/height', isCorrect: true },
                { id: 'b', text: 'Removes the border', isCorrect: false },
                { id: 'c', text: 'Makes the element circular', isCorrect: false },
                { id: 'd', text: 'Adds extra margin', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'border-box includes padding and border in the total width/height.'
            },
            {
              _id: 'q3',
              question: 'Padding is the space outside the border.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: false },
                { id: 'b', text: 'False', isCorrect: true }
              ],
              correctAnswer: 'b',
              explanation: 'False — padding is the space BETWEEN content and border. Margin is outside.'
            },
            {
              _id: 'q4',
              question: 'What is the default value of box-sizing?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'border-box', isCorrect: false },
                { id: 'b', text: 'padding-box', isCorrect: false },
                { id: 'c', text: 'content-box', isCorrect: true },
                { id: 'd', text: 'margin-box', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'The default is content-box, where width/height only include content.'
            },
            {
              _id: 'q5',
              question: 'Arrange the box model layers from inside to outside:',
              type: 'drag-drop',
              options: [
                { id: 'content', text: 'Content (innermost)', isCorrect: false },
                { id: 'padding', text: 'Padding', isCorrect: false },
                { id: 'border', text: 'Border', isCorrect: false },
                { id: 'margin', text: 'Margin (outermost)', isCorrect: false }
              ],
              correctAnswer: ['content', 'padding', 'border', 'margin']
            }
          ]
        }
      },
      {
        _id: 'lesson-2-2',
        moduleId: 'mod-2',
        title: 'CSS Positioning',
        content: `<h2>CSS Positioning</h2>
<p>The position property controls how an element is positioned in the document.</p>
<h3>Position Values</h3>
<ul>
  <li><strong>static</strong> — Default. Normal document flow.</li>
  <li><strong>relative</strong> — Positioned relative to its normal position.</li>
  <li><strong>absolute</strong> — Positioned relative to nearest positioned ancestor.</li>
  <li><strong>fixed</strong> — Positioned relative to the viewport. Stays in place on scroll.</li>
  <li><strong>sticky</strong> — Toggles between relative and fixed based on scroll position.</li>
</ul>
<pre><code>.relative-box {
  position: relative;
  top: 10px;
  left: 20px;
}

.absolute-box {
  position: absolute;
  top: 0;
  right: 0;
}</code></pre>`,
        order: 2,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-2-2',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What is the default value of the position property?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'relative', isCorrect: false },
                { id: 'b', text: 'absolute', isCorrect: false },
                { id: 'c', text: 'static', isCorrect: true },
                { id: 'd', text: 'fixed', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'The default position value is static.'
            },
            {
              _id: 'q2',
              question: 'Which position value keeps an element fixed on the viewport during scroll?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'relative', isCorrect: false },
                { id: 'b', text: 'absolute', isCorrect: false },
                { id: 'c', text: 'fixed', isCorrect: true },
                { id: 'd', text: 'sticky', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'position: fixed keeps the element in the same place during scrolling.'
            },
            {
              _id: 'q3',
              question: 'An absolutely positioned element is relative to its nearest positioned ancestor.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'Absolute positioning uses the nearest ancestor with a non-static position.'
            },
            {
              _id: 'q4',
              question: 'Which property is NOT used with position?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'top', isCorrect: false },
                { id: 'b', text: 'z-index', isCorrect: false },
                { id: 'c', text: 'float', isCorrect: true },
                { id: 'd', text: 'left', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'float is a separate layout property, not part of positioning.'
            },
            {
              _id: 'q5',
              question: 'What does position: sticky do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Always fixed to the viewport', isCorrect: false },
                { id: 'b', text: 'Toggles between relative and fixed based on scroll', isCorrect: true },
                { id: 'c', text: 'Removes the element from flow', isCorrect: false },
                { id: 'd', text: 'Centers the element', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'Sticky acts like relative until a scroll threshold, then becomes fixed.'
            }
          ]
        }
      },
      {
        _id: 'lesson-2-3',
        moduleId: 'mod-2',
        title: 'Display & Float',
        content: `<h2>Display & Float</h2>
<p>The display property defines how an element is rendered on the page.</p>
<h3>Display Values</h3>
<ul>
  <li><strong>block</strong> — Full width, starts on new line (div, p, h1-h6)</li>
  <li><strong>inline</strong> — Only as wide as content, no new line (span, a)</li>
  <li><strong>inline-block</strong> — Inline flow but with block-like width/height</li>
  <li><strong>none</strong> — Element is hidden and removed from flow</li>
</ul>
<pre><code>.box { display: block; }
.tag { display: inline; }
.badge { display: inline-block; }
.hidden { display: none; }</code></pre>
<h3>Float Property</h3>
<p>Float was originally used for layouts (wrapping text around images):</p>
<pre><code>.float-left { float: left; }
.float-right { float: right; }
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}</code></pre>`,
        order: 3,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-2-3',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'Which display value makes an element take full width?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'inline', isCorrect: false },
                { id: 'b', text: 'block', isCorrect: true },
                { id: 'c', text: 'inline-block', isCorrect: false },
                { id: 'd', text: 'flex', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'display: block makes the element take full available width.'
            },
            {
              _id: 'q2',
              question: 'What does display: none do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Makes element invisible but keeps space', isCorrect: false },
                { id: 'b', text: 'Removes element from flow entirely', isCorrect: true },
                { id: 'c', text: 'Sets opacity to 0', isCorrect: false },
                { id: 'd', text: 'Hides element with visibility: hidden', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'display: none removes the element completely from the document flow.'
            },
            {
              _id: 'q3',
              question: 'Inline elements respect width and height properties.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: false },
                { id: 'b', text: 'False', isCorrect: true }
              ],
              correctAnswer: 'b',
              explanation: 'Inline elements do NOT respect width/height. Use inline-block for that.'
            },
            {
              _id: 'q4',
              question: 'Which is NOT a float value?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'left', isCorrect: false },
                { id: 'b', text: 'right', isCorrect: false },
                { id: 'c', text: 'center', isCorrect: true },
                { id: 'd', text: 'none', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'There is no "float: center" value in CSS.'
            },
            {
              _id: 'q5',
              question: 'What is the purpose of a clearfix?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'To clear floats and contain floated children', isCorrect: true },
                { id: 'b', text: 'To center elements', isCorrect: false },
                { id: 'c', text: 'To add padding', isCorrect: false },
                { id: 'd', text: 'To reset all styles', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'A clearfix clears floats so the parent container wraps floated children.'
            }
          ]
        }
      }
    ]
  },
  {
    _id: 'mod-3',
    title: 'Flexbox',
    description: 'Master Flexbox — the most powerful one-dimensional layout system in CSS.',
    order: 3,
    isLocked: true,
    lessons: [
      {
        _id: 'lesson-3-1',
        moduleId: 'mod-3',
        title: 'Flexbox Fundamentals',
        content: `<h2>Flexbox Fundamentals</h2>
<p>Flexbox is a one-dimensional layout method for arranging items in rows or columns. It's perfect for distributing space and aligning content.</p>
<h3>Creating a Flex Container</h3>
<pre><code>.container {
  display: flex;
}</code></pre>
<h3>Flex Container Properties</h3>
<ul>
  <li><strong>flex-direction</strong> — row | row-reverse | column | column-reverse</li>
  <li><strong>justify-content</strong> — flex-start | center | flex-end | space-between | space-around | space-evenly</li>
  <li><strong>align-items</strong> — flex-start | center | flex-end | stretch | baseline</li>
  <li><strong>flex-wrap</strong> — nowrap | wrap | wrap-reverse</li>
  <li><strong>gap</strong> — sets spacing between flex items</li>
</ul>
<pre><code>.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}</code></pre>`,
        order: 1,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-3-1',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What property creates a flex container?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'position: flex', isCorrect: false },
                { id: 'b', text: 'display: flex', isCorrect: true },
                { id: 'c', text: 'flex: container', isCorrect: false },
                { id: 'd', text: 'layout: flex', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'display: flex creates a flex container.'
            },
            {
              _id: 'q2',
              question: 'Which property controls spacing between flex items?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'margin', isCorrect: false },
                { id: 'b', text: 'padding', isCorrect: false },
                { id: 'c', text: 'gap', isCorrect: true },
                { id: 'd', text: 'spacing', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'The gap property sets spacing between flex items.'
            },
            {
              _id: 'q3',
              question: 'justify-content aligns items along the cross axis.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: false },
                { id: 'b', text: 'False', isCorrect: true }
              ],
              correctAnswer: 'b',
              explanation: 'justify-content aligns along the MAIN axis. align-items handles the cross axis.'
            },
            {
              _id: 'q4',
              question: 'Which flex-direction value stacks items vertically?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'row', isCorrect: false },
                { id: 'b', text: 'column', isCorrect: true },
                { id: 'c', text: 'vertical', isCorrect: false },
                { id: 'd', text: 'stack', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'flex-direction: column stacks items vertically.'
            },
            {
              _id: 'q5',
              question: 'What does flex-wrap: wrap do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Prevents items from wrapping', isCorrect: false },
                { id: 'b', text: 'Allows items to wrap to the next line', isCorrect: true },
                { id: 'c', text: 'Wraps text inside items', isCorrect: false },
                { id: 'd', text: 'Reverses the order', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'flex-wrap: wrap allows items to flow onto multiple lines.'
            }
          ]
        }
      },
      {
        _id: 'lesson-3-2',
        moduleId: 'mod-3',
        title: 'Flex Items Properties',
        content: `<h2>Flex Items Properties</h2>
<p>Flex items (direct children of a flex container) have their own set of properties.</p>
<h3>Item Properties</h3>
<ul>
  <li><strong>flex-grow</strong> — How much an item can grow (default: 0)</li>
  <li><strong>flex-shrink</strong> — How much an item can shrink (default: 1)</li>
  <li><strong>flex-basis</strong> — Initial size before growing/shrinking</li>
  <li><strong>flex</strong> — Shorthand: flex-grow flex-shrink flex-basis</li>
  <li><strong>align-self</strong> — Override align-items for a single item</li>
  <li><strong>order</strong> — Change the visual order of items</li>
</ul>
<pre><code>.item {
  flex: 1 0 200px; /* grow: 1, shrink: 0, basis: 200px */
}

.first-item {
  order: -1; /* Moves this item to the beginning */
}</code></pre>`,
        order: 2,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-3-2',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What is the default value of flex-grow?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '1', isCorrect: false },
                { id: 'b', text: '0', isCorrect: true },
                { id: 'c', text: 'auto', isCorrect: false },
                { id: 'd', text: 'inherit', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'By default, flex items do not grow (flex-grow: 0).'
            },
            {
              _id: 'q2',
              question: 'What does "flex: 1" mean?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'flex-grow: 1, flex-shrink: 1, flex-basis: 0%', isCorrect: true },
                { id: 'b', text: 'Only flex-grow: 1', isCorrect: false },
                { id: 'c', text: 'flex-grow: 0, flex-shrink: 0, flex-basis: 1px', isCorrect: false },
                { id: 'd', text: 'A flex item with 1px width', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: '"flex: 1" is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%.'
            },
            {
              _id: 'q3',
              question: 'align-self overrides the container\'s align-items for a single item.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'align-self allows individual items to override the container alignment.'
            },
            {
              _id: 'q4',
              question: 'What does the order property do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Changes HTML order', isCorrect: false },
                { id: 'b', text: 'Changes visual order of flex items', isCorrect: true },
                { id: 'c', text: 'Sets animation order', isCorrect: false },
                { id: 'd', text: 'Determines z-index', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'The order property changes the visual order without altering HTML.'
            },
            {
              _id: 'q5',
              question: 'flex-basis sets the initial main size of a flex item.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'flex-basis defines the initial size before flex-grow/shrink are applied.'
            }
          ]
        }
      }
    ]
  },
  {
    _id: 'mod-4',
    title: 'CSS Grid',
    description: 'Learn CSS Grid — the most powerful two-dimensional layout system.',
    order: 4,
    isLocked: true,
    lessons: [
      {
        _id: 'lesson-4-1',
        moduleId: 'mod-4',
        title: 'Grid Fundamentals',
        content: `<h2>CSS Grid Fundamentals</h2>
<p>CSS Grid Layout is a two-dimensional system that lets you create complex layouts with rows AND columns.</p>
<h3>Creating a Grid</h3>
<pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}</code></pre>
<h3>Key Properties</h3>
<ul>
  <li><strong>grid-template-columns</strong> — Defines column sizes</li>
  <li><strong>grid-template-rows</strong> — Defines row sizes</li>
  <li><strong>grid-column</strong> — Where an item starts/ends in columns</li>
  <li><strong>grid-row</strong> — Where an item starts/ends in rows</li>
  <li><strong>grid-area</strong> — Names areas for placement</li>
</ul>
<pre><code>.wide-item {
  grid-column: 1 / 3; /* Spans 2 columns */
  grid-row: 1 / 2;
}</code></pre>`,
        order: 1,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-4-1',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What property creates a grid container?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'display: grid', isCorrect: true },
                { id: 'b', text: 'position: grid', isCorrect: false },
                { id: 'c', text: 'layout: grid', isCorrect: false },
                { id: 'd', text: 'grid: true', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'display: grid creates a grid container.'
            },
            {
              _id: 'q2',
              question: 'What does "repeat(3, 1fr)" create?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '3 rows of equal height', isCorrect: false },
                { id: 'b', text: '3 columns of equal width', isCorrect: true },
                { id: 'c', text: '3 items with 1fr padding', isCorrect: false },
                { id: 'd', text: 'A 3×3 grid', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'repeat(3, 1fr) creates 3 equal-width columns.'
            },
            {
              _id: 'q3',
              question: 'Grid is only a one-dimensional layout system.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: false },
                { id: 'b', text: 'False', isCorrect: true }
              ],
              correctAnswer: 'b',
              explanation: 'Grid is TWO-dimensional (rows AND columns). Flexbox is one-dimensional.'
            },
            {
              _id: 'q4',
              question: 'What unit does "fr" represent?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Fixed ratio', isCorrect: false },
                { id: 'b', text: 'Fraction of available space', isCorrect: true },
                { id: 'c', text: 'Frame rate', isCorrect: false },
                { id: 'd', text: 'Free space', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'The "fr" unit represents a fraction of the available free space.'
            },
            {
              _id: 'q5',
              question: 'How do you make an item span 2 columns?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'grid-column: span 2', isCorrect: true },
                { id: 'b', text: 'column-span: 2', isCorrect: false },
                { id: 'c', text: 'grid-columns: 2', isCorrect: false },
                { id: 'd', text: 'width: 200%', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'grid-column: span 2 (or grid-column: 1 / 3) makes an item span 2 columns.'
            }
          ]
        }
      },
      {
        _id: 'lesson-4-2',
        moduleId: 'mod-4',
        title: 'Grid Areas & Responsive Grid',
        content: `<h2>Grid Areas & Responsive Grid</h2>
<p>Named grid areas make complex layouts readable and manageable.</p>
<h3>Named Areas</h3>
<pre><code>.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }</code></pre>
<h3>Responsive Grid</h3>
<pre><code>.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}</code></pre>`,
        order: 2,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-4-2',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What property is used to name a grid area?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'grid-name', isCorrect: false },
                { id: 'b', text: 'grid-area', isCorrect: true },
                { id: 'c', text: 'area-name', isCorrect: false },
                { id: 'd', text: 'grid-id', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'The grid-area property assigns a name to a grid item.'
            },
            {
              _id: 'q2',
              question: 'What does auto-fit do in grid-template-columns?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Fits content to exact size', isCorrect: false },
                { id: 'b', text: 'Creates as many columns as fit', isCorrect: true },
                { id: 'c', text: 'Auto-adjusts font size', isCorrect: false },
                { id: 'd', text: 'Removes empty columns', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'auto-fit creates as many columns as will fit in the container.'
            },
            {
              _id: 'q3',
              question: 'The dot (.) in grid-template-areas represents an empty cell.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'A dot (.) represents an unnamed/empty grid cell.'
            },
            {
              _id: 'q4',
              question: 'minmax(250px, 1fr) means:',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Exactly 250px', isCorrect: false },
                { id: 'b', text: 'At least 250px, at most 1fr', isCorrect: true },
                { id: 'c', text: 'Between 250 and 1px', isCorrect: false },
                { id: 'd', text: 'Maximum 250px', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'minmax sets a minimum and maximum size range.'
            },
            {
              _id: 'q5',
              question: 'Grid-template-areas must form a complete rectangle.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'Each named area in grid-template-areas must form a rectangular shape.'
            }
          ]
        }
      }
    ]
  },
  {
    _id: 'mod-5',
    title: 'Animations & Transitions',
    description: 'Bring your designs to life with CSS animations, transitions, and transforms.',
    order: 5,
    isLocked: true,
    lessons: [
      {
        _id: 'lesson-5-1',
        moduleId: 'mod-5',
        title: 'CSS Transitions',
        content: `<h2>CSS Transitions</h2>
<p>Transitions allow you to smoothly animate changes between CSS property values.</p>
<h3>Transition Properties</h3>
<ul>
  <li><strong>transition-property</strong> — Which property to animate</li>
  <li><strong>transition-duration</strong> — How long the animation takes</li>
  <li><strong>transition-timing-function</strong> — The speed curve (ease, linear, ease-in, ease-out, ease-in-out)</li>
  <li><strong>transition-delay</strong> — Wait before starting</li>
</ul>
<pre><code>.button {
  background: blue;
  transition: background 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background: darkblue;
  transform: scale(1.05);
}</code></pre>`,
        order: 1,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-5-1',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What does transition-duration control?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Which property to animate', isCorrect: false },
                { id: 'b', text: 'How long the animation takes', isCorrect: true },
                { id: 'c', text: 'The delay before starting', isCorrect: false },
                { id: 'd', text: 'The speed curve', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'transition-duration sets how long the transition takes.'
            },
            {
              _id: 'q2',
              question: 'Which timing function starts slow, goes fast, then ends slow?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'linear', isCorrect: false },
                { id: 'b', text: 'ease', isCorrect: true },
                { id: 'c', text: 'ease-in', isCorrect: false },
                { id: 'd', text: 'ease-out', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'ease starts slow, speeds up, then slows down at the end.'
            },
            {
              _id: 'q3',
              question: 'Transitions animate from one state to another automatically.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'Transitions automatically animate between property changes.'
            },
            {
              _id: 'q4',
              question: 'What is the shorthand syntax for transitions?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'transition: property duration timing delay', isCorrect: true },
                { id: 'b', text: 'transition: timing property duration', isCorrect: false },
                { id: 'c', text: 'transition: duration property', isCorrect: false },
                { id: 'd', text: 'transition: delay timing duration', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'The shorthand is: property duration timing-function delay'
            },
            {
              _id: 'q5',
              question: 'Can you transition all properties?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Yes, all properties are animatable', isCorrect: false },
                { id: 'b', text: 'No, only animatable properties can be transitioned', isCorrect: true },
                { id: 'c', text: 'Only color properties', isCorrect: false },
                { id: 'd', text: 'Only size properties', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'Only animatable (interpolatable) properties can be transitioned.'
            }
          ]
        }
      },
      {
        _id: 'lesson-5-2',
        moduleId: 'mod-5',
        title: 'CSS Keyframe Animations',
        content: `<h2>CSS Keyframe Animations</h2>
<p>Keyframe animations give you more control than transitions by defining multiple points (keyframes) in the animation.</p>
<h3>Defining Animations</h3>
<pre><code>@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease forwards;
}</code></pre>
<h3>Animation Properties</h3>
<ul>
  <li><strong>animation-name</strong> — Name of @keyframes</li>
  <li><strong>animation-duration</strong> — Length of animation</li>
  <li><strong>animation-timing-function</strong> — Speed curve</li>
  <li><strong>animation-delay</strong> — Delay before start</li>
  <li><strong>animation-iteration-count</strong> — Number of times (or infinite)</li>
  <li><strong>animation-direction</strong> — normal | reverse | alternate</li>
  <li><strong>animation-fill-mode</strong> — forwards | backwards | both</li>
</ul>`,
        order: 2,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-5-2',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What rule is used to define keyframe animations?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '@transition', isCorrect: false },
                { id: 'b', text: '@keyframes', isCorrect: true },
                { id: 'c', text: '@animate', isCorrect: false },
                { id: 'd', text: '@animation', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: '@keyframes is used to define animation keyframes.'
            },
            {
              _id: 'q2',
              question: 'What does animation-fill-mode: forwards do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Repeats the animation', isCorrect: false },
                { id: 'b', text: 'Keeps the final state after animation ends', isCorrect: true },
                { id: 'c', text: 'Reverses the animation', isCorrect: false },
                { id: 'd', text: 'Delays the animation', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'forwards keeps the element in its final animation state.'
            },
            {
              _id: 'q3',
              question: 'animation-iteration-count: infinite makes the animation repeat forever.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'infinite makes the animation loop endlessly.'
            },
            {
              _id: 'q4',
              question: 'Keyframes can have percentage-based steps.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'You can use percentages: 0%, 25%, 50%, 75%, 100%'
            },
            {
              _id: 'q5',
              question: 'What does animation-direction: alternate do?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Plays animation backwards only', isCorrect: false },
                { id: 'b', text: 'Alternates between forward and reverse', isCorrect: true },
                { id: 'c', text: 'Skips every other frame', isCorrect: false },
                { id: 'd', text: 'Randomizes direction', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'alternate plays forward, then backward, then forward, etc.'
            }
          ]
        }
      }
    ]
  },
  {
    _id: 'mod-6',
    title: 'Responsive Design & Best Practices',
    description: 'Learn media queries, mobile-first design, and CSS best practices.',
    order: 6,
    isLocked: true,
    lessons: [
      {
        _id: 'lesson-6-1',
        moduleId: 'mod-6',
        title: 'Media Queries',
        content: `<h2>Media Queries</h2>
<p>Media queries allow you to apply CSS rules based on device characteristics like screen width, height, orientation, etc.</p>
<h3>Basic Syntax</h3>
<pre><code>/* Mobile first approach */
.container { padding: 1rem; }

@media (min-width: 768px) {
  .container { padding: 2rem; }
}

@media (min-width: 1024px) {
  .container { padding: 3rem; }
}</code></pre>
<h3>Common Breakpoints</h3>
<ul>
  <li><strong>Mobile</strong>: up to 767px</li>
  <li><strong>Tablet</strong>: 768px - 1023px</li>
  <li><strong>Desktop</strong>: 1024px - 1279px</li>
  <li><strong>Large Desktop</strong>: 1280px+</li>
</ul>`,
        order: 1,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-6-1',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What are media queries used for?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Creating animations', isCorrect: false },
                { id: 'b', text: 'Applying styles based on device characteristics', isCorrect: true },
                { id: 'c', text: 'Connecting to APIs', isCorrect: false },
                { id: 'd', text: 'Importing fonts', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'Media queries apply CSS based on device characteristics.'
            },
            {
              _id: 'q2',
              question: 'Mobile-first design means starting with:',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Desktop styles, then media queries for mobile', isCorrect: false },
                { id: 'b', text: 'Mobile styles, then min-width media queries', isCorrect: true },
                { id: 'c', text: 'Tablet styles only', isCorrect: false },
                { id: 'd', text: 'No styles at all', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'Mobile-first starts with base mobile styles and adds min-width queries.'
            },
            {
              _id: 'q3',
              question: 'max-width media query applies styles BELOW a certain width.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: true },
                { id: 'b', text: 'False', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'max-width applies styles when the viewport is at or below the specified width.'
            },
            {
              _id: 'q4',
              question: 'Which media query feature targets screen orientation?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'screen-type', isCorrect: false },
                { id: 'b', text: 'orientation', isCorrect: true },
                { id: 'c', text: 'device-mode', isCorrect: false },
                { id: 'd', text: 'view-mode', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'The orientation media feature targets portrait or landscape.'
            },
            {
              _id: 'q5',
              question: 'What is the typical tablet breakpoint range?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '320px - 480px', isCorrect: false },
                { id: 'b', text: '768px - 1023px', isCorrect: true },
                { id: 'c', text: '1024px - 1280px', isCorrect: false },
                { id: 'd', text: '1280px+', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'Tablets typically range from 768px to 1023px.'
            }
          ]
        }
      },
      {
        _id: 'lesson-6-2',
        moduleId: 'mod-6',
        title: 'CSS Best Practices',
        content: `<h2>CSS Best Practices</h2>
<p>Write clean, maintainable, and performant CSS with these best practices.</p>
<h3>Key Principles</h3>
<ol>
  <li><strong>Use CSS Custom Properties (Variables)</strong> — Reuse values easily</li>
  <li><strong>Mobile-First</strong> — Start small, enhance for larger screens</li>
  <li><strong>BEM Naming</strong> — Block__Element--Modifier for class names</li>
  <li><strong>Reset/Normalize</strong> — Start from a consistent baseline</li>
  <li><strong>Avoid !important</strong> — Use specificity instead</li>
  <li><strong>Shorthand Properties</strong> — Write less, do more</li>
</ol>
<pre><code>:root {
  --primary: #3b82f6;
  --spacing: 1rem;
  --radius: 8px;
}

.card {
  padding: var(--spacing);
  border-radius: var(--radius);
  background: white;
}</code></pre>`,
        order: 2,
        type: 'lesson',
        isLocked: false,
        quiz: {
          _id: 'quiz-6-2',
          passingScore: 80,
          timeLimit: 5,
          questions: [
            {
              _id: 'q1',
              question: 'What is the BEM naming convention?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'Block__Element--Modifier', isCorrect: true },
                { id: 'b', text: 'Base-Element-Modifier', isCorrect: false },
                { id: 'c', text: 'Block.Element.Modifier', isCorrect: false },
                { id: 'd', text: 'Basic-Element-Markup', isCorrect: false }
              ],
              correctAnswer: 'a',
              explanation: 'BEM stands for Block__Element--Modifier.'
            },
            {
              _id: 'q2',
              question: 'CSS custom properties are defined using:',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: '$variable', isCorrect: false },
                { id: 'b', text: '@variable', isCorrect: false },
                { id: 'c', text: '--variable', isCorrect: true },
                { id: 'd', text: '#variable', isCorrect: false }
              ],
              correctAnswer: 'c',
              explanation: 'CSS custom properties use double hyphen prefix: --variable'
            },
            {
              _id: 'q3',
              question: 'You should always use !important to override styles.',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'True', isCorrect: false },
                { id: 'b', text: 'False', isCorrect: true }
              ],
              correctAnswer: 'b',
              explanation: '!important should be avoided. Use proper specificity instead.'
            },
            {
              _id: 'q4',
              question: 'Which is a shorthand property?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'margin-top', isCorrect: false },
                { id: 'b', text: 'margin', isCorrect: true },
                { id: 'c', text: 'margin-left', isCorrect: false },
                { id: 'd', text: 'margin-right', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: 'margin is shorthand for margin-top, -right, -bottom, -left.'
            },
            {
              _id: 'q5',
              question: 'Where should CSS custom properties be defined for global access?',
              type: 'multiple-choice',
              options: [
                { id: 'a', text: 'In each component', isCorrect: false },
                { id: 'b', text: 'In the :root selector', isCorrect: true },
                { id: 'c', text: 'In the body tag only', isCorrect: false },
                { id: 'd', text: 'In a separate JavaScript file', isCorrect: false }
              ],
              correctAnswer: 'b',
              explanation: ':root is the highest-level selector, making variables globally available.'
            }
          ]
        }
      }
    ]
  }
];

// ============================================================================
// DEMO LESSON GENERATOR — Populates each module to 20 lessons total
// To remove demo content later, simply delete the call to addDemoLessons()
// and any references to it.
// ============================================================================
interface DemoTopic {
  title: string;
  summary: string;
  codeSnippet: string;
}

const demoTopicsByModule: { [key: string]: DemoTopic[] } = {
  'mod-1': [
    { title: 'CSS Units & Measurements', summary: 'Learn px, em, rem, %, vw, vh and when to use each.', codeSnippet: `.box {\n  font-size: 1rem;      /* 16px default */\n  width: 50vw;          /* 50% of viewport width */\n  margin: 2em;          /* Relative to font-size */\n}` },
    { title: 'Colors in CSS', summary: 'Named colors, hex, RGB, RGBA, HSL, and HSLA color formats.', codeSnippet: `.colored {\n  color: #ff5733;       /* Hex */\n  background: rgba(0,0,0,0.5);\n  border-color: hsl(120, 100%, 50%);\n}` },
    { title: 'CSS Fonts & Typography', summary: 'font-family, font-size, line-height, and Google Fonts integration.', codeSnippet: `@import url('https://fonts.googleapis.com/css2?family=Inter');\n.text {\n  font-family: 'Inter', sans-serif;\n  line-height: 1.6;\n}` },
    { title: 'CSS Backgrounds', summary: 'background-color, background-image, gradients, and background-size.', codeSnippet: `.bg {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  background-size: cover;\n}` },
    { title: 'CSS Borders & Outlines', summary: 'border styles, border-radius, outline, and decorative borders.', codeSnippet: `.card {\n  border: 2px solid #ddd;\n  border-radius: 12px;\n  outline: 2px dashed blue;\n}` },
    { title: 'CSS Margins & Padding Deep Dive', summary: 'Shorthand syntax, margin collapse, and padding tricks.', codeSnippet: `.spacing {\n  margin: 10px 20px 30px 40px; /* T R B L */\n  padding: 1rem 2rem;\n}` },
    { title: 'Overflow & Clipping', summary: 'overflow: visible, hidden, scroll, auto and clip-path basics.', codeSnippet: `.scrollable {\n  overflow: auto;\n  max-height: 200px;\n}` },
    { title: 'CSS Combinators', summary: 'Descendant, child, adjacent sibling, and general sibling selectors.', codeSnippet: `div > p      { /* direct child */ }\nh1 + p       { /* adjacent sibling */ }\nh1 ~ p       { /* general sibling */ }` },
    { title: 'Pseudo-Classes', summary: ':hover, :focus, :nth-child, :first-of-type and more.', codeSnippet: `li:nth-child(odd) { background: #f0f0f0; }\na:hover { color: red; }\ninput:focus { outline: 2px solid blue; }` },
    { title: 'Pseudo-Elements', summary: '::before, ::after, ::first-line, ::first-letter and creative uses.', codeSnippet: `.heading::before {\n  content: "→";\n  margin-right: 0.5rem;\n  color: blue;\n}` },
    { title: 'CSS Specificity in Practice', summary: 'Real-world examples of specificity conflicts and resolution.', codeSnippet: `/* Specificity scores: */\ndiv        { /* 0,0,1 */ }\n.class     { /* 0,1,0 */ }\n#id        { /* 1,0,0 */ }\nstyle=""   { /* 1,0,0,0 */ }` },
    { title: 'CSS Variables (Custom Properties)', summary: 'Defining and using --custom properties with var().', codeSnippet: `:root {\n  --primary: #3b82f6;\n  --spacing: 1rem;\n}\n.btn { color: var(--primary); }` },
    { title: 'CSS Reset & Normalize', summary: 'Why resetting browser defaults matters and common approaches.', codeSnippet: `*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}` },
    { title: 'CSS Opacity & Transparency', summary: 'opacity vs rgba() vs transparent, layering effects.', codeSnippet: `.transparent {\n  opacity: 0.7;\n  background: rgba(0, 0, 0, 0.3);\n}` },
    { title: 'CSS Visibility & Display', summary: 'display:none vs visibility:hidden vs opacity:0 differences.', codeSnippet: `.hidden { display: none; }         /* Removed from flow */\n.invisible { visibility: hidden; } /* Keeps space */` },
    { title: 'CSS Lists & Counters', summary: 'Custom list styles and CSS counters for numbered content.', codeSnippet: `ul { list-style: none; }\nli::before {\n  content: "★ ";\n  color: gold;\n}` },
    { title: 'CSS Tables Styling', summary: 'Beautiful table designs with borders, zebra stripes, and hover.', codeSnippet: `table { border-collapse: collapse; }\nth { background: #333; color: white; }\ntr:hover { background: #f5f5f5; }` },
  ],
  'mod-2': [
    { title: 'Inline vs Block vs Inline-Block', summary: 'Understanding display types and their behavior in the document flow.', codeSnippet: `span { display: inline-block; width: 100px; }` },
    { title: 'Float Layouts (Legacy)', summary: 'Understanding float-based layouts and the clearfix pattern.', codeSnippet: `.col { float: left; width: 50%; }\n.clearfix::after {\n  content: "";\n  display: table;\n  clear: both;\n}` },
    { title: 'CSS Position: Relative', summary: 'How relative positioning works and when to use it.', codeSnippet: `.relative {\n  position: relative;\n  top: 10px; left: 5px;\n}` },
    { title: 'CSS Position: Absolute', summary: 'Absolute positioning within positioned containers.', codeSnippet: `.badge {\n  position: absolute;\n  top: -10px; right: -10px;\n}` },
    { title: 'CSS Position: Fixed', summary: 'Creating fixed elements that stay in the viewport.', codeSnippet: `.navbar {\n  position: fixed;\n  top: 0; left: 0; right: 0;\n  z-index: 100;\n}` },
    { title: 'CSS Position: Sticky', summary: 'Hybrid positioning for sticky headers and sidebars.', codeSnippet: `thead {\n  position: sticky;\n  top: 0; background: white;\n}` },
    { title: 'Z-Index & Stacking Context', summary: 'Understanding z-index, stacking order, and new stacking contexts.', codeSnippet: `.modal { z-index: 1000; }\n.overlay { z-index: 999; }` },
    { title: 'CSS Overflow Deep Dive', summary: 'Controlling content overflow with practical examples.', codeSnippet: `.card { overflow: hidden; text-overflow: ellipsis; }` },
    { title: 'Min/Max Width & Height', summary: 'Constraining element sizes with min/max properties.', codeSnippet: `.responsive {\n  min-width: 300px;\n  max-width: 1200px;\n}` },
    { title: 'CSS calc() Function', summary: 'Dynamic calculations with calc(), min(), max(), and clamp().', codeSnippet: `.container {\n  width: calc(100% - 40px);\n  font-size: clamp(1rem, 2.5vw, 2rem);\n}` },
    { title: 'Box-Sizing Border-Box', summary: 'Why border-box is the recommended default for all elements.', codeSnippet: `*, *::before, *::after {\n  box-sizing: border-box;\n}` },
    { title: 'CSS Object-Fit', summary: 'Controlling how images and videos fit within containers.', codeSnippet: `img {\n  object-fit: cover;\n  width: 100%; height: 200px;\n}` },
    { title: 'CSS Aspect-Ratio', summary: 'Maintaining proportions with the modern aspect-ratio property.', codeSnippet: `.video-wrapper {\n  aspect-ratio: 16 / 9;\n}` },
    { title: 'CSS Columns', summary: 'Multi-column layouts with column-count and column-gap.', codeSnippet: `.article {\n  column-count: 3;\n  column-gap: 2rem;\n}` },
    { title: 'CSS Shapes', summary: 'Wrapping text around custom shapes with shape-outside.', codeSnippet: `.circle {\n  shape-outside: circle(50%);\n  float: left;\n}` },
    { title: 'CSS Writing Modes', summary: 'Vertical text and right-to-left layouts.', codeSnippet: `.vertical {\n  writing-mode: vertical-rl;\n}` },
    { title: 'CSS Clip-Path', summary: 'Creating complex clipping shapes with clip-path.', codeSnippet: `.clipped {\n  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);\n}` },
  ],
  'mod-3': [
    { title: 'Flexbox: justify-content Values', summary: 'Explore all justify-content options with visual examples.', codeSnippet: `.container {\n  justify-content: space-between;\n}` },
    { title: 'Flexbox: align-items vs align-content', summary: 'Understanding cross-axis alignment differences.', codeSnippet: `.container {\n  align-items: center;\n  align-content: stretch;\n}` },
    { title: 'Flexbox: flex-wrap in Practice', summary: 'When and how to use wrapping with real layouts.', codeSnippet: `.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}` },
    { title: 'Flexbox: flex-grow Explained', summary: 'How flex-grow distributes available space among items.', codeSnippet: `.item { flex-grow: 1; }\n.item-double { flex-grow: 2; }` },
    { title: 'Flexbox: flex-shrink Explained', summary: 'Controlling how items shrink when space is limited.', codeSnippet: `.item { flex-shrink: 0; } /* Never shrink */` },
    { title: 'Flexbox: flex-basis Explained', summary: 'Setting initial sizes before flex-grow/shrink apply.', codeSnippet: `.item { flex-basis: 200px; }` },
    { title: 'Flexbox Shorthand: flex', summary: 'Using the flex shorthand for grow, shrink, and basis.', codeSnippet: `.item { flex: 1 0 200px; }` },
    { title: 'Flexbox: align-self Override', summary: 'Individual item alignment that overrides the container.', codeSnippet: `.special {\n  align-self: flex-end;\n}` },
    { title: 'Flexbox: Order Property', summary: 'Changing visual order without modifying HTML.', codeSnippet: `.first { order: -1; } /* Moves to start */` },
    { title: 'Flexbox: Centering Perfectly', summary: 'The classic centering trick: justify-content + align-items.', codeSnippet: `.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}` },
    { title: 'Flexbox Navigation Bars', summary: 'Building responsive nav bars with Flexbox.', codeSnippet: `nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}` },
    { title: 'Flexbox Card Layouts', summary: 'Creating card grids with equal heights using Flexbox.', codeSnippet: `.cards {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1rem;\n}` },
    { title: 'Flexbox Holy Grail Layout', summary: 'Classic header-sidebar-content-sidebar-footer layout.', codeSnippet: `.layout { display: flex; flex-direction: column; min-height: 100vh; }\n.body { display: flex; flex: 1; }` },
    { title: 'Flexbox Footer Sticky', summary: 'Keeping footer at the bottom with Flexbox.', codeSnippet: `body { display: flex; flex-direction: column; min-height: 100vh; }\nfooter { margin-top: auto; }` },
    { title: 'Flexbox vs Grid: When to Use', summary: 'Decision guide for choosing between Flexbox and Grid.', codeSnippet: `/* Flexbox for 1D, Grid for 2D */\n.nav { display: flex; }      /* 1D: row */\n.gallery { display: grid; }  /* 2D: rows+cols */` },
    { title: 'Flexbox Responsive Patterns', summary: 'Common responsive patterns built with Flexbox.', codeSnippet: `.row {\n  display: flex;\n  flex-direction: column;\n}\n@media (min-width: 768px) {\n  .row { flex-direction: row; }\n}` },
    { title: 'Flexbox Gaps & Spacing', summary: 'Modern gap property for flex containers.', codeSnippet: `.flex-container {\n  display: flex;\n  gap: 1rem;           /* row & column */\n  row-gap: 0.5rem;\n  column-gap: 1rem;\n}` },
  ],
  'mod-4': [
    { title: 'Grid: repeat() Function', summary: 'Using repeat(), auto-fit, and auto-fill efficiently.', codeSnippet: `.grid {\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n}` },
    { title: 'Grid: fr Unit Deep Dive', summary: 'Understanding fractional units and mixed sizing.', codeSnippet: `.grid {\n  grid-template-columns: 2fr 1fr 1fr;\n}` },
    { title: 'Grid: grid-column & grid-row', summary: 'Spanning and placing items across the grid.', codeSnippet: `.wide { grid-column: 1 / 3; }\n.tall { grid-row: span 2; }` },
    { title: 'Grid Template Areas', summary: 'Named areas for intuitive layout design.', codeSnippet: `.grid {\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n}` },
    { title: 'Grid: minmax() Function', summary: 'Setting flexible size ranges for grid tracks.', codeSnippet: `.grid {\n  grid-template-columns: repeat(3, minmax(150px, 1fr));\n}` },
    { title: 'Grid: auto-fit vs auto-fill', summary: 'The subtle difference between auto-fit and auto-fill.', codeSnippet: `/* auto-fit: collapses empty tracks */\n/* auto-fill: keeps empty tracks */\n.grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }` },
    { title: 'Grid Gap & Gutters', summary: 'Controlling spacing with gap, row-gap, and column-gap.', codeSnippet: `.grid {\n  display: grid;\n  gap: 2rem;\n  row-gap: 1rem;\n  column-gap: 2rem;\n}` },
    { title: 'Grid: justify-items & align-items', summary: 'Item-level alignment within grid cells.', codeSnippet: `.grid {\n  justify-items: center;\n  align-items: start;\n}` },
    { title: 'Grid: justify-content & align-content', summary: 'Aligning the entire grid within its container.', codeSnippet: `.grid {\n  justify-content: center;\n  align-content: end;\n}` },
    { title: 'Grid: Implicit vs Explicit Grid', summary: 'Understanding auto-placement and implicit tracks.', codeSnippet: `.grid {\n  grid-auto-rows: minmax(100px, auto);\n  grid-auto-flow: dense;\n}` },
    { title: 'Grid: Nested Grids', summary: 'Creating complex layouts by nesting grid containers.', codeSnippet: `.parent { display: grid; }\n.child { display: grid; grid-template-columns: 1fr 1fr; }` },
    { title: 'Grid: Subgrid', summary: 'Inheriting the parent grid with the subgrid feature.', codeSnippet: `.child {\n  grid-template-columns: subgrid;\n}` },
    { title: 'Grid: Responsive Image Gallery', summary: 'Building a responsive gallery with CSS Grid.', codeSnippet: `.gallery {\n  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n}` },
    { title: 'Grid: Dashboard Layout', summary: 'Creating a full dashboard layout with named areas.', codeSnippet: `.dashboard {\n  grid-template-areas:\n    "nav main aside"\n    "nav main .";\n}` },
    { title: 'Grid: Overlapping Items', summary: 'Placing items on top of each other for layered designs.', codeSnippet: `.overlay {\n  grid-column: 1 / -1;\n  grid-row: 1 / -1;\n}` },
    { title: 'Grid: masonry-like Layout', summary: 'Approximating masonry with CSS Grid.', codeSnippet: `.masonry {\n  grid-template-columns: repeat(3, 1fr);\n  grid-auto-rows: 10px;\n}` },
    { title: 'Grid: Holy Grail Layout', summary: 'The classic 5-area layout built with Grid.', codeSnippet: `.holy-grail {\n  grid-template-areas:\n    "header header header"\n    "nav main aside"\n    "footer footer footer";\n}` },
  ],
  'mod-5': [
    { title: 'CSS Transforms: translate()', summary: 'Moving elements with translate(), translateX(), translateY().', codeSnippet: `.moved {\n  transform: translate(50px, 20px);\n}` },
    { title: 'CSS Transforms: scale()', summary: 'Scaling elements up and down without affecting layout.', codeSnippet: `.big { transform: scale(1.5); }\n.small { transform: scale(0.8); }` },
    { title: 'CSS Transforms: rotate()', summary: 'Rotating elements with positive and negative angles.', codeSnippet: `.rotated { transform: rotate(45deg); }` },
    { title: 'CSS Transforms: skew()', summary: 'Skewing elements along X or Y axis for perspective effects.', codeSnippet: `.skewed { transform: skewX(-10deg); }` },
    { title: 'CSS Transform Origin', summary: 'Changing the pivot point for transforms.', codeSnippet: `.spin {\n  transform-origin: top left;\n  transform: rotate(45deg);\n}` },
    { title: 'Combining Transforms', summary: 'Applying multiple transforms in a single declaration.', codeSnippet: `.complex {\n  transform: translateX(50px) rotate(15deg) scale(1.2);\n}` },
    { title: 'Transition Timing Functions', summary: 'linear, ease, ease-in, ease-out, ease-in-out, and cubic-bezier.', codeSnippet: `.smooth {\n  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}` },
    { title: 'Transition on Multiple Properties', summary: 'Animating different properties with different durations.', codeSnippet: `.btn {\n  transition: background 0.3s, transform 0.2s, box-shadow 0.4s;\n}` },
    { title: 'Keyframes: From/To Syntax', summary: 'Simple two-step animations with from and to.', codeSnippet: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}` },
    { title: 'Keyframes: Percentage Steps', summary: 'Multi-step animations with percentage keyframes.', codeSnippet: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}` },
    { title: 'Animation: Iteration Count', summary: 'Controlling how many times an animation repeats.', codeSnippet: `.spinner {\n  animation: spin 1s linear infinite;\n}` },
    { title: 'Animation: Direction', summary: 'Normal, reverse, alternate, and alternate-reverse.', codeSnippet: `.pingpong {\n  animation: slide 2s ease alternate infinite;\n}` },
    { title: 'Animation: Play State', summary: 'Pausing and resuming animations with animation-play-state.', codeSnippet: `.paused { animation-play-state: paused; }` },
    { title: 'CSS Hover Animations', summary: 'Creative hover effects using transitions and transforms.', codeSnippet: `.card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 12px 24px rgba(0,0,0,0.15);\n}` },
    { title: 'CSS Loading Spinners', summary: 'Building loading indicators with pure CSS animations.', codeSnippet: `.spinner {\n  border: 3px solid #f3f3f3;\n  border-top: 3px solid #3498db;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}` },
    { title: 'CSS Scroll Animations', summary: 'Triggering animations based on scroll position with CSS.', codeSnippet: `@keyframes slideUp {\n  from { opacity: 0; transform: translateY(40px); }\n  to { opacity: 1; transform: translateY(0); }\n}` },
    { title: 'Animation Performance', summary: 'Using transform and opacity for GPU-accelerated animations.', codeSnippet: `/* Good: GPU accelerated */\n.fast { transform: translateX(100px); opacity: 0; }\n/* Bad: triggers layout */\n.slow { left: 100px; display: none; }` },
  ],
  'mod-6': [
    { title: 'Mobile-First vs Desktop-First', summary: 'Comparing approaches and why mobile-first is recommended.', codeSnippet: `/* Mobile-first (recommended) */\n.box { padding: 1rem; }\n@media (min-width: 768px) {\n  .box { padding: 2rem; }\n}` },
    { title: 'Breakpoint Strategy', summary: 'Choosing the right breakpoints for your design.', codeSnippet: `/* Common breakpoints */\n/* 640px: sm, 768px: md */\n/* 1024px: lg, 1280px: xl */\n/* 1536px: 2xl */` },
    { title: 'Responsive Images', summary: 'Using srcset, sizes, and picture element with CSS.', codeSnippet: `img {\n  max-width: 100%;\n  height: auto;\n  object-fit: cover;\n}` },
    { title: 'Responsive Typography', summary: 'Fluid font sizes with clamp(), vw units, and media queries.', codeSnippet: `h1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n}` },
    { title: 'CSS Container Queries', summary: 'The modern way to create component-responsive designs.', codeSnippet: `.card-container {\n  container-type: inline-size;\n}\n@container (min-width: 400px) {\n  .card { flex-direction: row; }\n}` },
    { title: 'Responsive Navigation Patterns', summary: 'Hamburger menus, tab bars, and adaptive navigation.', codeSnippet: `@media (max-width: 768px) {\n  nav { flex-direction: column; }\n  .menu { display: none; }\n}` },
    { title: 'CSS Aspect Ratio for Media', summary: 'Maintaining proper ratios for images and embeds.', codeSnippet: `.video { aspect-ratio: 16/9; width: 100%; }` },
    { title: 'Print Stylesheets', summary: 'Creating CSS for printed documents.', codeSnippet: `@media print {\n  .no-print { display: none; }\n  body { font-size: 12pt; }\n}` },
    { title: 'Dark Mode with prefers-color-scheme', summary: 'Detecting and styling for system dark mode.', codeSnippet: `@media (prefers-color-scheme: dark) {\n  body { background: #111; color: #eee; }\n}` },
    { title: 'Reduced Motion Accessibility', summary: 'Respecting prefers-reduced-motion for accessibility.', codeSnippet: `@media (prefers-reduced-motion: reduce) {\n  *, *::before { animation: none !important; }\n}` },
    { title: 'CSS Performance Tips', summary: 'Optimizing CSS for faster page loads.', codeSnippet: `/* Use shorthand properties */\n/* Minimize deep selector nesting */\n/* Avoid expensive properties like width */` },
    { title: 'CSS Architecture: BEM', summary: 'Block Element Modifier methodology for scalable CSS.', codeSnippet: `.card { }              /* Block */\n.card__title { }      /* Element */\n.card--featured { }   /* Modifier */` },
    { title: 'CSS Architecture: Utility-First', summary: 'Understanding utility-first CSS and when to use it.', codeSnippet: `/* Tailwind-style utilities */\n<div class="p-4 bg-white rounded shadow">\n  <h2 class="text-xl font-bold">Hello</h2>\n</div>` },
    { title: 'CSS Linting & Formatting', summary: 'Using tools like Stylelint and Prettier for consistent CSS.', codeSnippet: `/* stylelint.config.js */\nmodule.exports = {\n  extends: ["stylelint-config-standard"],\n};` },
    { title: 'CSS-in-JS Overview', summary: 'Styled-components, Emotion, and CSS-in-JS patterns.', codeSnippet: `const Button = styled.button\`\n  background: blue;\n  color: white;\n  padding: 0.5rem 1rem;\n\`;` },
    { title: 'CSS Design Tokens', summary: 'Using CSS custom properties as a design system foundation.', codeSnippet: `:root {\n  --color-primary: #3b82f6;\n  --space-md: 1rem;\n  --radius-lg: 8px;\n}` },
    { title: 'Future of CSS', summary: 'Emerging features: :has(), nesting, scroll-driven animations.', codeSnippet: `/* CSS Nesting (native) */\n.card {\n  & .title { font-size: 1.5rem; }\n  &:hover { background: #f0f0f0; }\n}` },
  ]
};

/**
 * Generates a demo lesson for a given module and topic.
 * Each demo lesson has a comment marker for easy identification and removal.
 */
function createDemoLesson(moduleId: string, topic: DemoTopic, lessonNum: number) {
  return {
    _id: `${moduleId}-demo-${lessonNum}`,
    moduleId,
    title: topic.title,
    content: `<h2>${topic.title}</h2>
<p>${topic.summary}</p>
<h3>Example Code</h3>
<pre><code>${topic.codeSnippet}</code></pre>
<p>This is a <strong>demo lesson</strong> — a placeholder to demonstrate the LMS structure. The full content will be added during course development.</p>
<h3>Key Takeaways</h3>
<ul>
  <li>Understanding this concept is essential for CSS mastery</li>
  <li>Practice with the code editor to reinforce your learning</li>
  <li>Review related lessons for deeper understanding</li>
</ul>`,
    order: lessonNum,
    type: 'lesson' as const,
    isLocked: false,
    quiz: {
      _id: `quiz-${moduleId}-demo-${lessonNum}`,
      passingScore: 80,
      timeLimit: 5,
      questions: [
        {
          _id: `q-${moduleId}-demo-${lessonNum}-1`,
          question: `Which concept is the "${topic.title}" lesson primarily about?`,
          type: 'multiple-choice' as const,
          options: [
            { id: 'a', text: topic.title, isCorrect: true },
            { id: 'b', text: 'An unrelated CSS topic', isCorrect: false },
            { id: 'c', text: 'JavaScript fundamentals', isCorrect: false },
            { id: 'd', text: 'HTML structure', isCorrect: false }
          ],
          correctAnswer: 'a',
          explanation: `This lesson covers ${topic.title}.`
        },
        {
          _id: `q-${moduleId}-demo-${lessonNum}-2`,
          question: `CSS properties like those in ${topic.title} are used for visual styling.`,
          type: 'multiple-choice' as const,
          options: [
            { id: 'a', text: 'True', isCorrect: true },
            { id: 'b', text: 'False', isCorrect: false }
          ],
          correctAnswer: 'a',
          explanation: 'CSS is a styling language for visual presentation.'
        },
        {
          _id: `q-${moduleId}-demo-${lessonNum}-3`,
          question: `What does the "${topic.title}" concept help you achieve?`,
          type: 'multiple-choice' as const,
          options: [
            { id: 'a', text: 'Better visual design and layout control', isCorrect: true },
            { id: 'b', text: 'Database management', isCorrect: false },
            { id: 'c', text: 'Server configuration', isCorrect: false },
            { id: 'd', text: 'Network security', isCorrect: false }
          ],
          correctAnswer: 'a',
          explanation: 'CSS concepts help with visual design and layout.'
        },
        {
          _id: `q-${moduleId}-demo-${lessonNum}-4`,
          question: `Fill in the blank: To use ${topic.title.split(' ')[0].toLowerCase()} in CSS, you write a CSS ______.`,
          type: 'code-completion' as const,
          options: [
            { id: 'a', text: 'rule', isCorrect: false },
            { id: 'b', text: 'property', isCorrect: false },
            { id: 'c', text: 'variable', isCorrect: false }
          ],
          correctAnswer: 'property',
          explanation: 'CSS properties define specific styling aspects.'
        },
        {
          _id: `q-${moduleId}-demo-${lessonNum}-5`,
          question: `CSS concepts work together to create complete web designs.`,
          type: 'multiple-choice' as const,
          options: [
            { id: 'a', text: 'True', isCorrect: true },
            { id: 'b', text: 'False', isCorrect: false }
          ],
          correctAnswer: 'a',
          explanation: 'CSS concepts are designed to work together harmoniously.'
        }
      ]
    }
  };
}

/**
 * Adds demo lessons to each module to reach 20 lessons total.
 * To remove: Delete this function call and the generator above.
 */
function addDemoLessons() {
  courseModules.forEach((mod) => {
    // Module: [Number] — counting from mod.order
    const moduleNum = mod.order;
    const existingCount = mod.lessons.length;
    const topics = demoTopicsByModule[mod._id] || [];
    const needed = 20 - existingCount;

    for (let i = 0; i < needed && i < topics.length; i++) {
      const lessonNum = existingCount + i + 1;
      const demoLesson = createDemoLesson(mod._id, topics[i], lessonNum);

      // Add comment marker for tracking (visible in dev tools / code)
      // Module: [moduleNum], Course: [lessonNum]
      Object.defineProperty(demoLesson, '_comment', {
        value: `// Module: ${moduleNum}, Course: ${lessonNum} (demo placeholder)`,
        enumerable: false
      });

      mod.lessons.push(demoLesson);
    }
  });
}

// Execute demo lesson population
addDemoLessons();

export const finalExamQuestions: QuizQuestion[] = [
  {
    _id: 'fe-q1',
    question: 'CSS stands for Cascading Style Sheets.',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'True', isCorrect: true },
      { id: 'b', text: 'False', isCorrect: false }
    ],
    correctAnswer: 'a',
    explanation: 'CSS = Cascading Style Sheets'
  },
  {
    _id: 'fe-q2',
    question: 'Which property creates a flex container?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'display: flex', isCorrect: true },
      { id: 'b', text: 'position: flex', isCorrect: false },
      { id: 'c', text: 'flex: container', isCorrect: false },
      { id: 'd', text: 'layout: flex', isCorrect: false }
    ],
    correctAnswer: 'a',
    explanation: 'display: flex creates a flex container.'
  },
  {
    _id: 'fe-q3',
    question: 'The box-sizing: border-box includes padding and border in the element\'s total width.',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'True', isCorrect: true },
      { id: 'b', text: 'False', isCorrect: false }
    ],
    correctAnswer: 'a',
    explanation: 'border-box makes width/height include padding and border.'
  },
  {
    _id: 'fe-q4',
    question: 'What does the "fr" unit represent in CSS Grid?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Fixed ratio', isCorrect: false },
      { id: 'b', text: 'Fraction of available space', isCorrect: true },
      { id: 'c', text: 'Frame rate', isCorrect: false },
      { id: 'd', text: 'Free range', isCorrect: false }
    ],
    correctAnswer: 'b',
    explanation: 'The "fr" unit represents a fraction of available free space.'
  },
  {
    _id: 'fe-q5',
    question: 'Which CSS rule is used to define keyframe animations?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '@transition', isCorrect: false },
      { id: 'b', text: '@keyframes', isCorrect: true },
      { id: 'c', text: '@animate', isCorrect: false },
      { id: 'd', text: '@animation', isCorrect: false }
    ],
    correctAnswer: 'b',
    explanation: '@keyframes defines the animation stages.'
  },
  {
    _id: 'fe-q6',
    question: 'Mobile-first design uses max-width media queries.',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'True', isCorrect: false },
      { id: 'b', text: 'False', isCorrect: true }
    ],
    correctAnswer: 'b',
    explanation: 'Mobile-first uses min-width queries (starting from small screens up).'
  },
  {
    _id: 'fe-q7',
    question: 'Which selector has the highest specificity?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '.class', isCorrect: false },
      { id: 'b', text: '#id', isCorrect: false },
      { id: 'c', text: 'inline style', isCorrect: true },
      { id: 'd', text: 'element', isCorrect: false }
    ],
    correctAnswer: 'c',
    explanation: 'Inline styles have the highest specificity (1000 points).'
  },
  {
    _id: 'fe-q8',
    question: 'What does justify-content do in flexbox?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Aligns items on the cross axis', isCorrect: false },
      { id: 'b', text: 'Aligns items on the main axis', isCorrect: true },
      { id: 'c', text: 'Sets item order', isCorrect: false },
      { id: 'd', text: 'Wraps items', isCorrect: false }
    ],
    correctAnswer: 'b',
    explanation: 'justify-content aligns items along the main (horizontal by default) axis.'
  },
  {
    _id: 'fe-q9',
    question: 'animation-fill-mode: forwards keeps the final state after animation ends.',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'True', isCorrect: true },
      { id: 'b', text: 'False', isCorrect: false }
    ],
    correctAnswer: 'a',
    explanation: 'forwards preserves the last keyframe state after the animation completes.'
  },
  {
    _id: 'fe-q10',
    question: 'What does gap do in CSS Grid?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Sets the grid border', isCorrect: false },
      { id: 'b', text: 'Sets spacing between grid items', isCorrect: true },
      { id: 'c', text: 'Creates empty grid cells', isCorrect: false },
      { id: 'd', text: 'Sets grid background', isCorrect: false }
    ],
    correctAnswer: 'b',
    explanation: 'The gap property sets spacing between grid rows and columns.'
  }
];

export const PASSING_SCORE = 80;

export function getModule(moduleId: string): Module | undefined {
  return courseModules.find(m => m._id === moduleId);
}

export function getLesson(lessonId: string) {
  for (const mod of courseModules) {
    const lesson = mod.lessons.find(l => l._id === lessonId);
    if (lesson) return { lesson, module: mod };
  }
  return null;
}

export function getModuleLessons(moduleId: string) {
  const mod = courseModules.find(m => m._id === moduleId);
  return mod ? mod.lessons : [];
}

export function getTotalLessons(): number {
  return courseModules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}
