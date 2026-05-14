const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract the form section
const formStart = html.indexOf('<section class="preorder-section" id="form">');
const formEndStr = '</section>\n\n\n\n\n  <!-- FAQ -->';
const formEnd = html.indexOf('</section>', formStart);

if (formStart !== -1 && formEnd !== -1) {
  const formSection = html.slice(formStart, formEnd + '</section>'.length);
  
  // 2. Remove it from its original place
  html = html.replace(formSection, '');
  
  // 3. Insert it before <footer>
  html = html.replace('<footer>', '\n\n  ' + formSection + '\n\n  <footer>');
  
  // 4. Add auth modal HTML at the end before </body>
  const authModal = `  <div class="payment-modal" id="auth-modal" aria-hidden="true">
    <div class="payment-modal-card" role="dialog" aria-modal="true">
      <div class="payment-modal-title">Sign In to Suncrafts</div>
      <div class="payment-modal-sub">Sign in to track your orders and checkout faster.</div>
      <div class="payment-modal-actions">
        <button class="payment-btn payment-btn-primary" type="button" onclick="mockGoogleLogin()">Continue with Google</button>
        <button class="payment-btn payment-btn-secondary" type="button" onclick="closeAuthModal()">Cancel</button>
      </div>
    </div>
  </div>`;
  
  html = html.replace('</body>', authModal + '\n</body>');
  
  fs.writeFileSync('index.html', html);
  console.log('Successfully moved #form and added modal.');
} else {
  console.log('Failed to find form boundaries. formStart:', formStart, 'formEnd:', formEnd);
}
