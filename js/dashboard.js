/* ==========================================================================
   dashboard.js — admin dashboard (dashboard.html)
   Reads RSVP data live from the Netlify Database via the /api/rsvp function.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('senn_admin_authed') !== 'true') {
    window.location.href = 'admin-login.html';
    return;
  }

  const tableBody = document.getElementById('guest-table-body');
  const searchInput = document.getElementById('guest-search');
  const totalCount = document.getElementById('stat-total');
  const comingCount = document.getElementById('stat-coming');
  const notComingCount = document.getElementById('stat-not-coming');
  const refreshBtn = document.getElementById('refresh-btn');
  const exportBtn = document.getElementById('export-btn');
  const logoutBtn = document.getElementById('logout-btn');
  let pieChart = null;
  let guests = [];

  async function loadGuests() {
    tableBody.innerHTML = '<tr><td colspan="5" class="empty-row">Loading...</td></tr>';
    try {
      const res = await fetch('/api/rsvp');
      guests = await res.json();
      renderStats();
      renderTable(guests);
      renderChart();
    } catch (err) {
      tableBody.innerHTML = '<tr><td colspan="5" class="empty-row">Failed to load data.</td></tr>';
    }
  }

  function renderStats() {
    const coming = guests.filter((g) => g.attending).length;
    const notComing = guests.length - coming;
    totalCount.textContent = guests.length;
    comingCount.textContent = coming;
    notComingCount.textContent = notComing;
  }

  function renderTable(list) {
    if (!list.length) {
      tableBody.innerHTML = '<tr><td colspan="5" class="empty-row">No RSVPs yet.</td></tr>';
      return;
    }
    tableBody.innerHTML = list
      .map(
        (g) => `
      <tr>
        <td>${escapeHtml(g.fullName)}</td>
        <td>${escapeHtml(g.phoneNumber)}</td>
        <td><span class="badge ${g.attending ? 'badge-yes' : 'badge-no'}">${g.attending ? 'Coming' : "Can't Come"}</span></td>
        <td>${escapeHtml(g.message || '-')}</td>
        <td><button class="delete-btn" data-id="${g.id}">Delete</button></td>
      </tr>`
      )
      .join('');

    tableBody.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this RSVP entry?')) return;
        await fetch(`/api/rsvp?id=${btn.dataset.id}`, { method: 'DELETE' });
        loadGuests();
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderChart() {
    const canvas = document.getElementById('attendance-pie');
    if (!canvas || typeof Chart === 'undefined') return;
    const coming = guests.filter((g) => g.attending).length;
    const notComing = guests.length - coming;

    if (pieChart) pieChart.destroy();
    pieChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Coming', "Can't Come"],
        datasets: [
          {
            data: [coming, notComing],
            backgroundColor: ['#CFAF86', '#F5B6C9'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom' } },
      },
    });
  }

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    renderTable(
      guests.filter(
        (g) => g.fullName.toLowerCase().includes(q) || g.phoneNumber.toLowerCase().includes(q)
      )
    );
  });

  refreshBtn.addEventListener('click', loadGuests);

  exportBtn.addEventListener('click', () => {
    if (typeof XLSX === 'undefined') return;
    const rows = guests.map((g) => ({
      Name: g.fullName,
      Phone: g.phoneNumber,
      Attendance: g.attending ? 'Coming' : "Can't Come",
      Message: g.message || '',
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RSVPs');
    XLSX.writeFile(wb, 'senn-sweet17-guestlist.xlsx');
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('senn_admin_authed');
    window.location.href = 'index.html';
  });

  loadGuests();
});
