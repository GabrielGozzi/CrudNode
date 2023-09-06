function confirmarExclusao(id) {
    if (confirm("Você deseja excluir realmente esse registro?")) {
      window.location.href = `/excluir/${id}`;
    }
  }