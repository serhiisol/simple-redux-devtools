import { createContext, useContext, useEffect, useState } from 'react';

import { events } from '../../services/events';
import { Modal } from '../Modal';
import { Empty } from '../Empty';
import './Tree.scss';

const TreeContext = createContext(null);

function TreeNode({ label, value }) {
  const { expandedAll } = useContext(TreeContext);
  const [expanded, setExpanded] = useState(false);
  const originalValue = value;

  if (value?.isError) {
    const error = new Error(value.message);

    error.stack = value.stack.join('\n');
    value = error;
  }

  const isComplex = typeof value === 'object' && value !== null && !(value instanceof Error);
  const length = isComplex ? Object.keys(value).length : 0;
  const canExpand = isComplex && length > 0;

  const className = value instanceof Error ? 'error' : typeof value;

  useEffect(() => {
    setExpanded(expandedAll);
  }, [expandedAll]);

  function log() {
    events.sendMessage({
      type: 'request::log',
      data: originalValue,
    });
  }

  return (
    <li className="tree-node">
      <div className="tree-node-header">
        { canExpand &&
          <button
            className="material-icons tree-node-expand"
            onClick={ () => setExpanded(!expanded) }
            title={ expanded ? "Collapse" : "Expand" }
          >
            { expanded ? 'expand_less' : 'expand_more' }
          </button>
        }

        <span className="tree-node-key">{ label }:</span>

        { isComplex
          ? <span className="text-xs">{ Array.isArray(value) ? `[${length}]` : `{${length}}` }</span>
          : <span className={ className }>{ String(value) }</span>
        }

        <button
          className="material-icons"
          onClick={ log }
          title="Log"
        >
          arrow_circle_down
        </button>
      </div>

      { isComplex && expanded &&
        <div className="tree-nested">
          <Tree json={ value } />
        </div>
      }
    </li>
  );
}

function Tree({ json }) {
  const keys = Object.keys(json ?? {});

  return (
    <ul className="tree">
      { keys.map((label, index) =>
        <TreeNode label={ label } value={ json[label] } key={ index } />
      ) }
    </ul>
  );
}

interface TreeViewerProps {
  isModal?: boolean;
  json: any;
  onClose?: () => void;
  options?: {
    expandFullscreen?: boolean;
    onRefresh?: () => void;
  };
}

export function TreeViewer({ json, isModal, onClose, options }: TreeViewerProps) {
  const [expandedAll, setExpandedAll] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const hasData = Object.keys(json ?? {}).length > 0;

  return (
    <TreeContext.Provider value={ { expandedAll } }>
      { hasData &&
        <div className="grid tree-grid">
          <div className="header">
            { options?.onRefresh &&
              <button
                className="material-icons"
                onClick={ options.onRefresh }
                title="Refresh"
              >
                refresh
              </button>
            }

            <button
              className="material-icons"
              onClick={ () => setExpandedAll(true) }
              title="Expand All"
            >
              unfold_more
            </button>

            <button
              className="material-icons"
              onClick={ () => setExpandedAll(false) }
              title="Collapse All"
            >
              unfold_less
            </button>

            { options?.expandFullscreen &&
              <button
                className="material-icons ml-auto"
                onClick={ () => isModal ? onClose() : setModalShown(true) }
                title={ isModal ? "Close Fullscreen" : "Open Fullscreen" }
              >
                { isModal ? 'close_fullscreen' : 'open_in_full' }
              </button>
            }
          </div>

          <div className="content p-2">
            <Tree json={ json } />
          </div>
        </div>
      }

      { !hasData && <Empty /> }

      { modalShown && <Modal>
        <TreeViewer
          json={ json }
          options={ { expandFullscreen: true } }
          isModal={ true }
          onClose={ () => setModalShown(false) }
        />
      </Modal> }
    </TreeContext.Provider>
  );
}
