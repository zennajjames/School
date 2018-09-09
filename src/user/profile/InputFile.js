import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class InputFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: false
    }
    this.fileChange = this.fileChange.bind(this);
  }

  fileChange(files) {
    if (files.length > 0) {
      if (files.length > 1) {
        let filesNames = [];
        for (let i = 0; i < files.length; i++) {
          filesNames.push(files[i].name);
        }
        this.setState({files: filesNames});
      } else {
        this.setState({files: files[0].name});
      }
    } else {
      this.setState({files: false});
    }
  }

  onChangeHandler = (e) => {
    this.fileChange(e.target.files);
    this.props.getValue && this.props.getValue(e.target.files);
  }

  render() {
    const {
      className,
      btnTitle,
      btnColor,
      textFieldTitle,
      multiple,
      ...attributes
    } = this.props;

    const btnClass = classNames(
      'btn',
      'btn-' + btnColor,
      'btn-sm',
      'float-left'
    );

    const inputFieldClass = classNames(
      'file-path validate',
      this.state.files ? 'valid' : false,
      className
    );
    return (
      <form>
        <div className="file-field md-form">
          <div className={btnClass}>
            <span>{this.props.btnTitle}</span>
            <input multiple={this.props.multiple} onChange={this.onChangeHandler} type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className={inputFieldClass} type="text" placeholder={this.state.files ? this.state.files : this.props.textFieldTitle} />
          </div>
        </div>
      </form>
    );
  }
}

InputFile.propTypes = {
  className: PropTypes.string,
  btnTitle: PropTypes.string,
  btnColor: PropTypes.string,
  textFieldTitle: PropTypes.string,
  multiple: PropTypes.bool
};

InputFile.defaultProps = {
  btnTitle: "Choose file",
  textFieldTitle: "Upload your file",
  btnColor: "primary"
};

export default InputFile;
export { InputFile as MDBFileInput };

