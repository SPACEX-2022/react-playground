
export const PngAnimation = (props) => {
    const {
        src,
        frame = 0,
        direction = 'horizontal',
        imgWidth,
        imgHeight,
        className,
        offset = [0, 0],
    } = props;

    const position = [0, 0];

    let _frame = Math.round(frame);
    console.log(frame, _frame, imgWidth)
    if (direction === 'horizontal') {
        position[0] = _frame * imgWidth;
    } else {
        position[1] = _frame * imgHeight;
    }

    return (
      <div className={className} style={{ backgroundImage: `url(${src})`, width: '100%', height: '100%', backgroundPosition: `${position[0] + offset[0]}px ${position[1] + offset[1]}px` }}></div>
    );
}