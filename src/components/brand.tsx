    export function Brand({ compact = false }: { compact?: boolean }) {
        return (
            <div className={`brand ${compact ? "brand-compact" : ""}`}>
              <div className="brand-mark"><span /><span /><span /></div>
              {!compact && <div><b>FERRO</b><small>NORTE</small></div>}
            </div>
        );
    }