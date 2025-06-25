export default function Table(props) {
  const { columns = [], data = [], actions = null , headerClass = "table-primary"} = props;

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className={headerClass}>
          <tr>
            <th>#</th>
            {columns.map((col, i) => (
              <th key={i}>{col.label}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                {columns.map((col, i) => (
                  <td key={i}>
                    {col.render
                      ? col.render(row[col.key], row) // custom renderer if defined
                      : row[col.key]}
                  </td>
                ))}
                {actions && <td>{actions(row)}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions ? 2 : 1)} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
